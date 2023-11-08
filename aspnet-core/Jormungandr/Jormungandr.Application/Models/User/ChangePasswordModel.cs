namespace Jormungandr.Application.Models.User;

public class ChangePasswordModel
{
    public string OldPassword { get; set; }

    public string NewPassword { get; set; }
}
