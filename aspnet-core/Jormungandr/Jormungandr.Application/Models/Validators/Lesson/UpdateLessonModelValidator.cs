using FluentValidation;
using Jormungandr.Application.Models.Lesson;
using Jormungandr.Core.Entities;
using Jormungandr.DataAccess.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Jormungandr.Application.Models.Validators.Lesson;
public class UpdateLessonModelValidator : AbstractValidator<UpdateLessonModel>
{
    private readonly ILessonRepository _lessonRepository;
    private readonly UserManager<ApplicationUser> _userManager;

    public UpdateLessonModelValidator(ILessonRepository lessonRepository, UserManager<ApplicationUser> userManager)
    {
        _lessonRepository = lessonRepository;
        _userManager = userManager;

        RuleFor(e => e.TeacherId)
            .NotEmpty()
            .NotNull()
            .WithMessage("Teacher id cannot be null.")
            .Must(TeacherExist)
            .WithMessage("Teacher should exist.");

        RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .WithMessage("Lesson name cannot be null.")
            .Must((model, name) => LessonIsUnique(model.Name, model.TeacherId))
            .WithMessage("Lesson already exists.");
    }
    private bool LessonIsUnique(string name, Guid teacherId)
    {
        var anyLesson = _lessonRepository.GetAllAsync(e => e.TeacherId == teacherId && e.Name == name).GetAwaiter().GetResult().Any();

        return !anyLesson;
    }

    private bool TeacherExist(Guid teacherId)
    {
        var user = _userManager.FindByIdAsync(teacherId.ToString()).GetAwaiter().GetResult();

        return user != null;
    }
}
