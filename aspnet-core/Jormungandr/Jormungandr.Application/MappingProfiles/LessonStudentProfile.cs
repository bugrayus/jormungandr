using AutoMapper;
using Jormungandr.Application.Models.LessonStudent;
using Jormungandr.Core.Entities;

namespace Jormungandr.Application.MappingProfiles;
public class LessonStudentProfile : Profile
{
    public LessonStudentProfile()
    {
        CreateMap<CreateLessonStudentModel, LessonStudent>();

        CreateMap<UpdateLessonStudentModel, LessonStudent>();

        CreateMap<LessonStudent, LessonStudentResponseModel>();
    }
}
