namespace Jormungandr.Application.Models.LessonStudent;
public class LessonStudentResponseModel : BaseResponseModel
{
    public Guid StudentId { get; set; }
    public string StudentUserName { get; set; }
    public Guid LessonId { get; set; }
    public string LessonName { get; set; }
    public int? Midterm { get; set; }
    public int? Final { get; set; }
    public int? Makeup { get; set; }
}
