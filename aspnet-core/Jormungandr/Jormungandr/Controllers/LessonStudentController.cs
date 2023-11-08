using Jormungandr.Application.Models;
using Jormungandr.Application.Models.LessonStudent;
using Jormungandr.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jormungandr.Controllers;

[Authorize]
[Route("api/lesson-students")]
public class LessonStudentController : ApiController
{
    private readonly ILessonStudentService _lessonStudentService;

    public LessonStudentController(ILessonStudentService lessonStudentService)
    {
        _lessonStudentService = lessonStudentService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<LessonStudentResponseModel>>> GetAllAsync()
    {
        return Ok(await _lessonStudentService.GetAllAsync());
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CreateLessonStudentResponseModel>> CreateAsync(CreateLessonStudentModel createLessonStudentModel)
    {
        return Ok(await _lessonStudentService.CreateAsync(createLessonStudentModel));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UpdateLessonStudentResponseModel>> UpdateAsync(Guid id, UpdateLessonStudentModel updateLessonStudentModel)
    {
        return Ok(await _lessonStudentService.UpdateAsync(id, updateLessonStudentModel));
    }

    [HttpPut("{id:guid}/score")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult<UpdateLessonStudentResponseModel>> UpdateScoreAsync(Guid id, UpdateLessonStudentScoreModel updateLessonStudentModel)
    {
        return Ok(await _lessonStudentService.UpdateScoreAsync(id, updateLessonStudentModel));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<BaseResponseModel>> DeleteAsync(Guid id)
    {
        return Ok(await _lessonStudentService.DeleteAsync(id));
    }

    [HttpGet("by-user")]
    [Authorize(Roles = "Admin,Student")]
    public async Task<ActionResult<IEnumerable<LessonStudentResponseModel>>> GetAllByUserAsync()
    {
        return Ok(await _lessonStudentService.GetAllByUserAsync());
    }

    [HttpGet("by-lesson/{lessonId:guid}")]
    [Authorize(Roles = "Admin,Student,Teacher")]
    public async Task<ActionResult<IEnumerable<LessonStudentResponseModel>>> GetAllByLessonAsync(Guid lessonId)
    {
        return Ok(await _lessonStudentService.GetAllByLessonAsync(lessonId));
    }

    [HttpGet("{id:guid}")]
    [Authorize(Roles = "Admin,Student,Teacher")]
    public async Task<ActionResult<LessonStudentResponseModel>> GetByIdAsync(Guid id)
    {
        return Ok(await _lessonStudentService.GetByIdAsync(id));
    }
}
