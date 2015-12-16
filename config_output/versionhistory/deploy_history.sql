DECLARE @timestamp DATETIME
SET @timestamp=GETDATE() 
/*declare current date once to avoid changes in miliseconds during insert.
 Is needed for upstream sproc selects on update_timestamp. */

IF OBJECT_ID('tempdb..#base') IS NOT NULL
    DROP TABLE #base    
    
SELECT distinct
database_name, 
     [config_value]
      ,CONVERT(date,[modify_timestamp]) as modify_timestamp
      into #base
  FROM [dbo].[config]
  where config_item='coreRevision'
  and config_value is not null and config_value<>''
  --order by database_name, modify_timestamp
 
 IF OBJECT_ID('tempdb..#buckets') IS NOT NULL
    DROP TABLE #buckets  
  select a.*, bucket*100 as bucket
  into #buckets from #base a
  left join (   
   select  database_name ,ROW_NUMBER() over (ORDER BY database_name) AS bucket from(
   select distinct database_name from #base ) c
   ) b
   on a.database_name=b.database_name
  
   IF OBJECT_ID('tempdb..#ranked') IS NOT NULL
    DROP TABLE #ranked
  
  select *,ROW_NUMBER() over (partition by database_name ORDER BY modify_timestamp) AS row
  into #ranked
  from #buckets
  order by database_name, modify_timestamp
--select * from #ranked
   

 
    IF OBJECT_ID('tempdb..#ranked_subversion') IS NOT NULL
    DROP TABLE #ranked_subversion
  
   
select core,config_value,
rOW_NUMBER() over (partition by core ORDER BY core,version,cast(rc as int) ) AS ver_num
into #ranked_subversion from (
  select core,config_value,rc, case when rc =999 then SUBSTRING(right(config_value,3), CHARINDEX('.', right(config_value,3)) + 1, LEN(right(config_value,3))) 
   else SUBSTRING(right(config_value2,3), CHARINDEX('.', right(config_value2,3)) + 1, LEN(right(config_value2,3)))  end as version
  from (
   select distinct case when right(left(config_value,5),1)='.' then left(config_value,4) else  left(config_value,5) end as core, config_value,
   case when config_value like '%rc%' then SUBSTRING(config_value, CHARINDEX('rc.', config_value) + 3, LEN(config_value))
   else 999 end as rc
   ,SUBSTRING(config_value,0, CHARINDEX('-rc',config_value)) as config_value2
   from #ranked
   ) a
   ) b
   order by core, ver_num
  
  
      IF OBJECT_ID('tempdb..#ranks_normalized') IS NOT NULL
    DROP TABLE #ranks_normalized
  select a.* ,ver_num-avg_ver as n_rank
  into #ranks_normalized
   from #ranked_subversion a
  left join ( 
   select core,AVG(ver_num) as avg_ver
   from #ranked_subversion
   group by core ) b
   on a.core=b.core
   
  
  delete from dbo.deploy_history
   
   insert into dbo.deploy_history
   (
   [database_name]
   ,[config_value]
   ,[modify_timestamp]
   ,[end_date]
   ,[n_rank]
   ,[ENV]
   ,[CLIENT]  
   ,[insert_timestamp]
   ,[update_timestamp]
   ) 
    select
    a.database_name
   ,a.config_value
   ,a.modify_timestamp
   ,case when b.modify_timestamp is not null then CONVERT(date,b.modify_timestamp) else CONVERT(date,GETDATE()) end as end_date
   ,n_rank
   ,case when a.database_name like '%QA' then 'QA' else right(a.database_name,3) end ENV
   ,SUBSTRING(a.database_name,0, CHARINDEX('_',a.database_name)) as CLIENT
   ,@timestamp as [insert_timestamp]
   ,@timestamp as [update_timestamp]
  -- into dbo.report_output_test
     from #ranked a
   left join #ranked b
   on a.database_name=b.database_name
   and a.row=b.row-1
   left join #ranks_normalized c
   on c.config_value=a.config_value
   


   