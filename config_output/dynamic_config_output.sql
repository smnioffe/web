declare @server_name nvarchar(max)
set @server_name='[qdwsqlqa03]'

DECLARE @dbNameSQL NVARCHAR(MAX)

IF (Object_ID('tempdb..#db_name') IS NOT NULL)
    DROP TABLE #db_name;

SET @dbNameSQL='SELECT name, ROW_NUMBER() OVER(ORDER BY name DESC) AS rownum
into #db_name
 FROM @server_name+''sys.databases''
where name like ''%warehouse%''
and name not like ''%arcas%''
and name not like ''%hotfix%''
and name not like ''%upgrade%''
and name not like ''%dummy%''

IF (Object_ID('tempdb..#config') IS NOT NULL)
    DROP TABLE #config;
    
create table #config (
	[config_id] [int],
	[config_item] [varchar](50),
	[config_description] [varchar](255),
	[config_value] [varchar](max),
	[modify_timestamp] [datetime],
	[database_name] [varchar](max),
	[update_timestamp] [datetime]
) 


DECLARE @configSQL NVARCHAR(MAX)
DECLARE @y int
SET @y = 1         

	WHILE (@y <=(SELECT count(*) FROM #db_name ))
		BEGIN   


		
	 SELECT @configSQL =
	 
	 'INSERT INTO #config
	  SELECT distinct 
	  [config_id]
	 ,[config_item]
	 ,[config_description]
	 ,[config_value]
	 ,[update_timestamp] as [modify_timestamp]
	 ,cast('''+name + ''' as varchar(36)) as [database_name]
	 ,getdate() as [update_timestamp]
	 FROM @server_name.'+ name + '.[dbo].[config] with (nolock)'
	 FROM #db_name
	 WHERE rownum=@y
	 
	 
      BEGIN TRY
      PRINT @configSQL	
	 EXECUTE sp_executesql @configSQL
	 END TRY
	 BEGIN CATCH
	 END CATCH
	 
 
	 SET @y = @y + 1    
		END

				
SELECT * FROM #config
			
