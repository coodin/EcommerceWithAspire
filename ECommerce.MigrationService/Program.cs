using E_Commerce_API.Interceptors;
using E_Commerce_Data.Contexts;
using ECommerce.MigrationService;
using ECommerce.ServiceDefaults;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(Worker.ActivitySourceName));

builder.AddNpgsqlDbContext<DataContext>("PostgresECommerceDb", configureDbContextOptions: options =>
{
    options.AddInterceptors(new AuditingInterceptor());
});

var host = builder.Build();
host.Run();
