using Jormungandr.Application.Models;
using Jormungandr.Application.Models.Lesson;
using Jormungandr.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jormungandr.Controllers;
[Authorize]
[Route("api/lessons")]
public class LessonController : ApiController
{
    private readonly ILessonService _lessonService;

    public LessonController(ILessonService lessonService)
    {
        _lessonService = lessonService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<LessonResponseModel>>> GetAllAsync()
    {
        return Ok(await _lessonService.GetAllAsync());
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CreateLessonResponseModel>> CreateAsync(CreateLessonModel createLessonModel)
    {
        return Ok(await _lessonService.CreateAsync(createLessonModel));
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UpdateLessonResponseModel>> UpdateAsync(Guid id, UpdateLessonModel updateLessonModel)
    {
        return Ok(await _lessonService.UpdateAsync(id, updateLessonModel));
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<BaseResponseModel>> DeleteAsync(Guid id)
    {
        return Ok(await _lessonService.DeleteAsync(id));
    }

    [HttpGet("by-user")]
    [Authorize(Roles = "Admin,Teacher")]
    public async Task<ActionResult<IEnumerable<LessonResponseModel>>> GetAllByUserAsync()
    {
        return Ok(await _lessonService.GetAllByUserAsync());
    }

    [HttpGet("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<LessonResponseModel>> GetByIdAsync(Guid id)
    {
        return Ok(await _lessonService.GetByIdAsync(id));
    }
}
