using E_Commerce_Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce_Data.Contexts
{
    public sealed class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.AddInterceptors(new AuditingInterceptor());
        //}

        public DbSet<ProductCategory> ProductCategories { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Apply `NEWSEQUENTIALID` default for all Guid primary keys
        //    foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        //    {
        //        var primaryKey = entityType.FindPrimaryKey();
        //        if (primaryKey != null)
        //        {
        //            foreach (var property in primaryKey.Properties)
        //            {
        //                // Check if the property is of type Guid
        //                if (property.ClrType == typeof(Guid))
        //                {
        //                    property.SetDefaultValueSql("NEWSEQUENTIALID()");
        //                }
        //            }
        //        }
        //    }

        //}

    }
}
