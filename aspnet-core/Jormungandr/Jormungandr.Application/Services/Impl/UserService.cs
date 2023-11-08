using AutoMapper;
using Jormungandr.Application.Helpers;
using Jormungandr.Application.Models;
using Jormungandr.Application.Models.User;
using Jormungandr.Core.Entities;
using Jormungandr.Core.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Jormungandr.Application.Services.Impl;

public class UserService : IUserService
{
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserService(IMapper mapper,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IConfiguration configuration)
    {
        _mapper = mapper;
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    public async Task<CreateUserResponseModel> CreateAsync(CreateUserModel createUserModel)
    {
        var user = _mapper.Map<ApplicationUser>(createUserModel);

        var result = await _userManager.CreateAsync(user, createUserModel.Password);

        if (!result.Succeeded) throw new BadRequestException(result.Errors.FirstOrDefault()?.Description);

        if (!string.IsNullOrEmpty(createUserModel.Role))
        {
            var roleResult = await _userManager.AddToRoleAsync(user, createUserModel.Role);

            if (!roleResult.Succeeded) throw new BadRequestException(roleResult.Errors.FirstOrDefault()?.Description);
        }

        return new CreateUserResponseModel
        {
            Id = (await _userManager.FindByNameAsync(user.UserName)).Id
        };
    }

    public async Task<LoginResponseModel> LoginAsync(LoginUserModel loginUserModel)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginUserModel.Username);

        if (user == null)
            throw new NotFoundException("Username or password is incorrect");

        var signInResult = await _signInManager.PasswordSignInAsync(user, loginUserModel.Password, false, false);

        if (!signInResult.Succeeded)
            throw new BadRequestException("Username or password is incorrect");

        var token = JwtHelper.GenerateToken(user, _configuration, (await _userManager.GetRolesAsync(user)).FirstOrDefault());

        return new LoginResponseModel
        {
            Username = user.UserName,
            Email = user.Email,
            Token = token
        };
    }

    public async Task<BaseResponseModel> ChangePasswordAsync(Guid userId, ChangePasswordModel changePasswordModel)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user == null)
            throw new NotFoundException("User does not exist anymore");

        var result =
            await _userManager.ChangePasswordAsync(user, changePasswordModel.OldPassword,
                changePasswordModel.NewPassword);

        if (!result.Succeeded)
            throw new BadRequestException(result.Errors.FirstOrDefault()?.Description);

        return new BaseResponseModel
        {
            Id = user.Id
        };
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.Users.Where(e => e.Id == id).Include(e => e.Lessons).Include(e => e.LessonStudents).FirstOrDefaultAsync();

        return (await _userManager.DeleteAsync(user)).Succeeded;
    }

    public async Task<IEnumerable<ApplicationUserResponseModel>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var users = await _userManager.Users
            .Select(user => new ApplicationUserResponseModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            })
            .ToListAsync();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(_userManager.Users.First(u => u.Id == user.Id));
            user.Roles = roles.ToList();
        }

        return users;
    }

    public async Task<IEnumerable<ApplicationUserResponseModel>> GetAllByRoleAsync(string role, CancellationToken cancellationToken = default)
    {
        var users = await _userManager.GetUsersInRoleAsync(role);

        return _mapper.Map<IEnumerable<ApplicationUserResponseModel>>(users);
    }
}
