var builder = DistributedApplication.CreateBuilder(args);






//var db = builder.ExecutionContext.IsPublishMode ?
//    builder.AddConnectionString("") :
//    builder.AddSqlServer("sql", port: 14329)
//                 .WithLifetime(ContainerLifetime.Persistent)
//                 .WithDataVolume(name: "Sql-Server-For-Ecommerce")
//                 .WithEndpoint(name: "sqlexposedname", port: 14330, targetPort: 14329)
//                 .AddDatabase("ECommerceDB");


//var db = sql.AddDatabase("ECommerceDB");

var username = builder.AddParameter("username", secret: true);
var password = builder.AddParameter("password", secret: true);

// Conditionally update the app model with secrets.
var secrets =
    builder.ExecutionContext.IsPublishMode   
        ? builder.AddAzureKeyVault("secrets")
        : builder.AddConnectionString("secrets");

var db = builder
    .AddPostgres("postgres", username, password)
    .WithLifetime(ContainerLifetime.Persistent)
    .WithPgAdmin()
    .WithDataVolume(name: "Post-Gres-For-Ecommerce", isReadOnly: false)
    .AddDatabase("PostgresECommerceDb");

var migrations = builder.AddProject<Projects.ECommerce_MigrationService>("migrations")
    .WithReference(db)
    .WaitFor(db);

var eCommerceApi = builder.AddProject<Projects.ECommerce_Api>("e-commerce-api")
     .WithReference(db)
     .WaitFor(db)
     .WithReference(secrets)
     .WaitForCompletion(migrations)
     .WithExternalHttpEndpoints();

builder.AddNpmApp("react", "../reactproject1", scriptName: "dev")
    .WithReference(eCommerceApi)
    .WaitFor(eCommerceApi)
    .WithEnvironment("BROWSER", "none") // Disable opening browser on npm start
    .WithHttpEndpoint(port: 3030, targetPort: 3131, env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();



builder.Build().Run();
