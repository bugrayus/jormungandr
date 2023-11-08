using AutoMapper;
using Jormungandr.Application.Models.User;
using Jormungandr.Core.Entities;

namespace Jormungandr.Application.MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<CreateUserModel, ApplicationUser>();
        CreateMap<ApplicationUser, ApplicationUserResponseModel>();
    }
}
