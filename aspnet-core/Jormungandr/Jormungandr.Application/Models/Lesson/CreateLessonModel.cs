namespace Jormungandr.Application.Models.Lesson;
public class CreateLessonModel
{
    public Guid TeacherId { get; set; }
    public string Name { get; set; }
}

public class CreateLessonResponseModel : BaseResponseModel { }
