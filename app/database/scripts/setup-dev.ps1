sqlcmd -S localhost -E -C -i ".\database\schema\IRYS_Dev.sql"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Could not create the IRYS_Dev database."
    exit $LASTEXITCODE
}

sqlcmd -S localhost -d IRYS_Dev -E -C -i  ".\database\seed\mockData.sql"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to populate IRYS_Dev database with mock data"
    exit $LASTEXITCODE
}

Write-Host "Successfully created and populated the IRYS_Dev database."