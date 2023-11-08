using AutoMapper;
using Jormungandr.Application.Models.Lesson;
using Jormungandr.Core.Entities;

namespace Jormungandr.Application.MappingProfiles;
public class LessonProfile : Profile
{
    public LessonProfile()
    {
        CreateMap<CreateLessonModel, Lesson>();

        CreateMap<UpdateLessonModel, Lesson>();

        CreateMap<Lesson, LessonResponseModel>();
    }
}
