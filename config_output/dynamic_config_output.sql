DECLARE @dbNameSQL NVARCHAR(MAX)

IF (Object_ID('tempdb..#serverNames') IS NOT NULL)
    DROP TABLE #serverNames;

SELECT *
,ROW_NUMBER() OVER(ORDER BY [serverName] DESC) AS rownum
INTO #serverNames
FROM(
SELECT '[qdwsqlqa03]' AS [serverName]
UNION SELECT '[qdwsqlqa02]' AS [serverName]
UNION SELECT '[qdwsqldev05]' AS [serverName]
UNION SELECT '[qdwsqlprod03]' AS [serverName]
) a



IF (Object_ID('tempdb..##db_name') IS NOT NULL)
    DROP TABLE ##db_name;--select * from ##db_name

	    
create table ##db_name (
	[name] [nvarchar](255),
	[serverName] [varchar](255)
	)

DECLARE @i int
SET @i = 1         

	WHILE (@i <=(SELECT count(*) FROM #serverNames ))
		BEGIN
		   
	SELECT @dbNameSQL=
	'INSERT INTO ##db_name
	SELECT name,'''+serverName+''' as serverName
	FROM'+ servername+'.msdb.sys.databases
	where name like ''%warehouse%''
	and name not like ''%arcas%''
	and name not like ''%hotfix%''
	and name not like ''%upgrade%''
	and name not like ''%dummy%''
	and name not like ''%pcp%'''
	FROM #serverNames
	WHERE rownum=@i

	EXECUTE sp_executesql @dbNameSQL
 
	 SET @i = @i + 1    
		END


IF (Object_ID('tempdb..#output') IS NOT NULL)
    DROP TABLE #output;
SELECT *,ROW_NUMBER() OVER(ORDER BY name DESC) as rownum
INTO #output
FROM ##db_name



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

	WHILE (@y <=(SELECT max(rownum) FROM #output ))
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
	 FROM '+serverName+'.'+ name + '.[dbo].[config] with (nolock)'
	 FROM #output
	 WHERE rownum=@y
	 

	
     BEGIN TRY
	 EXECUTE sp_executesql @configSQL
	 END TRY
	 BEGIN CATCH
	 END CATCH
	 
 
	 SET @y = @y + 1    
		END

INSERT INTO [AnalyticsMonitoring].[dbo].[config]
(   	[config_id]
      ,[config_item]
      ,[config_description]
      ,[config_value]
      ,[modify_timestamp]
      ,[database_name]
      ,[update_timestamp]
)
SELECT
[config_id]
      ,[config_item]
      ,[config_description]
      ,[config_value]
      ,[modify_timestamp]
      ,[database_name]
      ,[update_timestamp]
FROM
#config
			
