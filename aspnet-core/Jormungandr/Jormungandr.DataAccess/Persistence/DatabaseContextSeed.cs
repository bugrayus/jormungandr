
using Jormungandr.Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Jormungandr.DataAccess.Persistence;
public static class DatabaseContextSeed
{
    public static async Task SeedDatabaseAsync(DatabaseContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
    {
        if (!roleManager.Roles.Any())
        {
            var role = new ApplicationRole { Name = "Admin", NormalizedName = "Admin", ConcurrencyStamp = "1" };

            await roleManager.CreateAsync(role);

            role = new ApplicationRole { Name = "Teacher", NormalizedName = "Teacher", ConcurrencyStamp = "2" };

            await roleManager.CreateAsync(role);

            role = new ApplicationRole { Name = "Student", NormalizedName = "Student", ConcurrencyStamp = "3" };

            await roleManager.CreateAsync(role);
        }

        if (!userManager.Users.Any())
        {
            var user = new ApplicationUser { UserName = "admin", Email = "admin@admin.com", EmailConfirmed = true };

            await userManager.CreateAsync(user, "Admin123.?");
            await userManager.AddToRoleAsync(user, "Admin");

            user = new ApplicationUser { UserName = "teacher", Email = "teacher@teacher.com", EmailConfirmed = true };

            await userManager.CreateAsync(user, "Teacher123.?");
            await userManager.AddToRoleAsync(user, "Teacher");

            user = new ApplicationUser { UserName = "student", Email = "student@student.com", EmailConfirmed = true };

            await userManager.CreateAsync(user, "Student123.?");
            await userManager.AddToRoleAsync(user, "Student");
        }

        await context.SaveChangesAsync();
    }
}