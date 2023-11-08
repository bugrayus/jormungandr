using Jormungandr.Core.Entities;
using Jormungandr.Shared.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Jormungandr.DataAccess.Persistence;
public class DatabaseContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
{
    private readonly IClaimService _claimService;

    public DatabaseContext(DbContextOptions options, IClaimService claimService) : base(options)
    {
        _claimService = claimService;
    }

    public DbSet<Lesson> Lessons { get; set; }

    public DbSet<LessonStudent> LessonsStudents { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    public new async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new())
    {
        //foreach (var entry in ChangeTracker.Entries<IAuditedEntity>())
        //    switch (entry.State)
        //    {
        //        case EntityState.Added:
        //            entry.Entity.CreatedBy = _claimService.GetUserId();
        //            entry.Entity.CreatedOn = DateTime.Now;
        //            break;
        //        case EntityState.Modified:
        //            entry.Entity.UpdatedBy = _claimService.GetUserId();
        //            entry.Entity.UpdatedOn = DateTime.Now;
        //            break;
        //    }

        return await base.SaveChangesAsync(cancellationToken);
    }
}