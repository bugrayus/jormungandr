using Jormungandr.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Jormungandr.DataAccess.Persistence;
public static class AutomatedMigration
{
    public static async Task MigrateAsync(IServiceProvider services)
    {
        var context = services.GetRequiredService<DatabaseContext>();

        await context.Database.MigrateAsync();

        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

        var roleManager = services.GetRequiredService<RoleManager<ApplicationRole>>();

        await DatabaseContextSeed.SeedDatabaseAsync(context, userManager, roleManager);
    }
}