using FluentValidation;
using Jormungandr.Application.Models.LessonStudent;
using Jormungandr.Core.Entities;
using Jormungandr.DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Jormungandr.Application.Models.Validators.LessonStudent;
public class CreateLessonStudentModelValidator : AbstractValidator<CreateLessonStudentModel>
{
    private readonly ILessonStudentRepository _lessonStudentRepository;
    private readonly UserManager<ApplicationUser> _userManager;

    public CreateLessonStudentModelValidator(ILessonStudentRepository lessonStudentRepository, UserManager<ApplicationUser> userManager)
    {
        _lessonStudentRepository = lessonStudentRepository;
        _userManager = userManager;

        RuleFor(e => e.StudentId)
            .NotEmpty()
            .NotNull()
            .WithMessage("Student id cannot be null.")
            .Must((model, lessonId) => LessonStudentIsUnique(model.StudentId, model.LessonId))
            .WithMessage("Lesson student already exists.");
    }
    private bool LessonStudentIsUnique(Guid studentId, Guid lessonId)
    {
        var anyLessonStudent = _lessonStudentRepository.GetAllAsync(e => e.StudentId == studentId && e.LessonId == lessonId).GetAwaiter().GetResult().Any();

        return !anyLessonStudent;
    }
}
