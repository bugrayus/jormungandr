namespace Jormungandr.Application.Models.LessonStudent;
public class UpdateLessonStudentModel
{
    public Guid StudentId { get; set; }
    public Guid LessonId { get; set; }
}

public class UpdateLessonStudentResponseModel : BaseResponseModel { }