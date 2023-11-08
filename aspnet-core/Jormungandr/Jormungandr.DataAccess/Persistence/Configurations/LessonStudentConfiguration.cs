using Jormungandr.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Jormungandr.DataAccess.Persistence.Configurations;
public class LessonStudentConfiguration : IEntityTypeConfiguration<LessonStudent>
{
    public void Configure(EntityTypeBuilder<LessonStudent> builder)
    {
        builder.HasOne(d => d.Student).WithMany(p => p.LessonStudents)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(d => d.Lesson).WithMany(p => p.LessonStudents)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.Cascade);
    }
}