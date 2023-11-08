using Jormungandr.Core.Common;

namespace Jormungandr.Core.Entities;
public class Lesson : BaseEntity
{
    public string Name { get; set; }
    public Guid TeacherId { get; set; }
    public virtual ApplicationUser Teacher { get; set; }
    public virtual ICollection<LessonStudent> LessonStudents { get; set; } = new List<LessonStudent>();
}
