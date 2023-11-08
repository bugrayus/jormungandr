using Jormungandr.Application.Models;
using Jormungandr.Application.Models.User;

namespace Jormungandr.Application.Services;

public interface IUserService
{
    Task<BaseResponseModel> ChangePasswordAsync(Guid userId, ChangePasswordModel changePasswordModel);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);

    Task<CreateUserResponseModel> CreateAsync(CreateUserModel createUserModel);

    Task<LoginResponseModel> LoginAsync(LoginUserModel loginUserModel);

    Task<IEnumerable<ApplicationUserResponseModel>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<IEnumerable<ApplicationUserResponseModel>> GetAllByRoleAsync(string role, CancellationToken cancellationToken = default);
}
