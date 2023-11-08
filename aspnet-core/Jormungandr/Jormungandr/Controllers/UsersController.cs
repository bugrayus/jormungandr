using Jormungandr.Application.Models.User;
using Jormungandr.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jormungandr.Controllers;
[Authorize]
[Route("api/users")]
public class UsersController : ApiController
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [AllowAnonymous]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CreateUserResponseModel>> RegisterAsync(CreateUserModel createUserModel)
    {
        return Ok(await _userService.CreateAsync(createUserModel));
    }

    [HttpPost("authenticate")]
    [AllowAnonymous]
    public async Task<ActionResult<LoginResponseModel>> LoginAsync(LoginUserModel loginUserModel)
    {
        return Ok(await _userService.LoginAsync(loginUserModel));
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<ApplicationUserResponseModel>>> GetAllAsync()
    {
        return Ok(await _userService.GetAllAsync());
    }

    [HttpGet("by-role")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<ApplicationUserResponseModel>>> GetAllByRoleAsync(string role)
    {
        return Ok(await _userService.GetAllByRoleAsync(role));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<bool>> DeleteAsync(Guid id)
    {
        return Ok(await _userService.DeleteAsync(id));
    }
}
