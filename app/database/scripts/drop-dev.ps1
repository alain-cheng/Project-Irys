#   This script deletes the IRYS_Dev database and its data from your system

$sqlQuery = @"
IF DB_ID(N'IRYS_Dev') IS NOT NULL
BEGIN
    ALTER DATABASE [IRYS_Dev]
        SET SINGLE_USER WITH ROLLBACK IMMEDIATE;

    DROP DATABASE [IRYS_DEV];
END
ELSE
BEGIN
    PRINT 'IRYS_Dev does not exist.'
END
"@

& sqlcmd -S localhost -d master -E -C -b -Q $sqlQuery

if ($LASTEXITCODE -ne 0) {
    Write-Error "IRYS_Dev database could not be deleted."
    exit $LASTEXITCODE
}

Write-Host "Deleted IRYS_Dev database."