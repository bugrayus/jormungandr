namespace Jormungandr.Application.Models.Lesson;
public class UpdateLessonModel
{
    public Guid TeacherId { get; set; }

    public string Name { get; set; }
}

public class UpdateLessonResponseModel : BaseResponseModel { }