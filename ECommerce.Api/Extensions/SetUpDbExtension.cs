using E_Commerce_API.Interceptors;
using E_Commerce_Data.Contexts;

namespace E_Commerce_API.Extensions
{
    public static class SetUpDbExtension
    {

        public static void AddMyDbContext(
            this WebApplicationBuilder builder
            )
        {
            var connection = String.Empty;
            ArgumentNullException.ThrowIfNull(builder);
            if (builder.Environment.IsDevelopment())
            {
                //var cfgBuilder = new ConfigurationBuilder()
                //                    .SetBasePath(Directory.GetCurrentDirectory())
                //                    .AddJsonFile("appsettings.json");// add other providers if needed
                //var _config = cfgBuilder.Build();
                //connection = _config.GetConnectionString("AZURE_SQL_LOCAL_CONNECTIONSTRING");
                connection = Environment.GetEnvironmentVariable("ConnectionString");

            }
            else
            {
                connection = Environment.GetEnvironmentVariable("SQLAZURECONNSTR_CONNECTIONSTRING");
                //CONNECTIONSTRING
                //SQLAZURECONNSTR_CONNECTIONSTRING
            }
            //builder.AddSqlServerDbContext<DataContext>("ECommerceDB");
            builder.AddNpgsqlDbContext<DataContext>("PostgresECommerceDb", configureDbContextOptions: options =>
            {
                options.AddInterceptors(new AuditingInterceptor());
            });
        }
    }
}
