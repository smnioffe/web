IF (Object_ID('tempdb..#db_name') IS NOT NULL)
    DROP TABLE #db_name;

SELECT name, ROW_NUMBER() OVER(ORDER BY name DESC) AS rownum
into #db_name --select * from #db_name
 FROM sys.databases
where name like '%warehouse%'
and name not like '%arcas%'
and name not like '%hotfix%'
and name not like '%upgrade%'


DECLARE @reprocessSQL NVARCHAR(MAX)
DECLARE @y int
SET @y = 1         

	WHILE (@y <=(SELECT count(*) FROM #db_name ))
		BEGIN   


		
	 SELECT @reprocessSQL =
	 'SELECT distinct cast('+name + ' as varchar(36)) as [database_name],[config_id] ,[config_item],[config_description],[config_value],[update_timestamp] as [modify_timestamp],getdate() as [update_timestamp] FROM '+ name + '.[dbo].[config] with (nolock)'
	 FROM #db_name
	 WHERE rownum=@y
	 

	 PRINT @reprocessSQL
	 
      BEGIN TRY
      PRINT @reprocessSQL	
	 EXECUTE sp_executesql @reprocessSQL
	 END TRY
	 BEGIN CATCH
	 END CATCH
	 
 
	 SET @y = @y + 1    
		END

				

			
