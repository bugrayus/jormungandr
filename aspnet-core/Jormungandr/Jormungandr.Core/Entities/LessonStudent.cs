using Jormungandr.Core.Common;

namespace Jormungandr.Core.Entities;
public class LessonStudent : BaseEntity
{
    public Guid StudentId { get; set; }
    public Guid LessonId { get; set; }
    public int? Midterm { get; set; }
    public int? Final { get; set; }
    public int? Makeup { get; set; }
    public virtual ApplicationUser Student { get; set; }
    public virtual Lesson Lesson { get; set; }
}
