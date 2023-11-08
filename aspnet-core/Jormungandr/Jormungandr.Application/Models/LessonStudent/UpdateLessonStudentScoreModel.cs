namespace Jormungandr.Application.Models.LessonStudent;
public class UpdateLessonStudentScoreModel
{
    public int? Midterm { get; set; }
    public int? Final { get; set; }
    public int? Makeup { get; set; }
}

public class UpdateLessonStudentScoreResponseModel : BaseResponseModel { }