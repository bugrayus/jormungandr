using Jormungandr.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jormungandr.DataAccess.Persistence.Configurations;
public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.HasMany(d => d.Lessons).WithOne(p => p.Teacher)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(d => d.LessonStudents).WithOne(p => p.Student)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.Cascade);
    }
}