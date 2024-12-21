
using E_Commerce_Data.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace E_Commerce_API.Interceptors
{
    public class AuditingInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(
            DbContextEventData eventData,
            InterceptionResult<int> result)
        {
            UpdateAuditProperties(eventData.Context);
            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
            DbContextEventData eventData,
            InterceptionResult<int> result,
            CancellationToken cancellationToken = default)
        {
            UpdateAuditProperties(eventData.Context);
            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        private void UpdateAuditProperties(DbContext? context)
        {
            if (context == null)
                return;

            var entries = context.ChangeTracker.Entries()
                      .Where(e => e.Entity != null &&
                                  (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added || entry.State == EntityState.Modified)
                {
                    var entityType = entry.Entity.GetType();
                    var properties = entityType.GetProperties();

                    foreach (var property in properties)
                    {
                      

                        if (entry.State == EntityState.Added &&
                            Attribute.IsDefined(property, typeof(CreatedAttribute)))
                        {
                            property.SetValue(entry.Entity, DateTime.UtcNow);
                        }

                        if (Attribute.IsDefined(property, typeof(UpdatedAttribute)))
                        {
                            property.SetValue(entry.Entity, DateTime.UtcNow);
                        }
                    }
                }
            }
        }
    }
}
