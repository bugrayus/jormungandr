using Microsoft.AspNetCore.Identity;

namespace Jormungandr.Core.Entities;
public class ApplicationUser : IdentityUser<Guid>
{
    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    public virtual ICollection<LessonStudent> LessonStudents { get; set; } = new List<LessonStudent>();
    //public virtual ICollection<AddressDistrict> AddressDistricts { get; set; } = new List<AddressDistrict>();

}
