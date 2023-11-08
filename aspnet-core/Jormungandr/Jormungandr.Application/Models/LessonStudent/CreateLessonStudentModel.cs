namespace Jormungandr.Application.Models.LessonStudent;
public class CreateLessonStudentModel
{
    public Guid StudentId { get; set; }
    public Guid LessonId { get; set; }
}

public class CreateLessonStudentResponseModel : BaseResponseModel { }