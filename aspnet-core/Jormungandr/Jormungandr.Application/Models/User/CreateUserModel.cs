namespace Jormungandr.Application.Models.User;

public class CreateUserModel
{
    public string Username { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public string Role { get; set; }
}

public class CreateUserResponseModel : BaseResponseModel { }
