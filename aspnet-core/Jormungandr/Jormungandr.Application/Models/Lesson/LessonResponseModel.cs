namespace Jormungandr.Application.Models.Lesson;
public class LessonResponseModel : BaseResponseModel
{
    public string Name { get; set; }
    public string TeacherUserName { get; set; }
    public Guid TeacherId { get; set; }
}
