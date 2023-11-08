namespace Jormungandr.Application.Models.User;
public class ApplicationUserResponseModel : BaseResponseModel
{
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public List<string> Roles { get; set; }
}
