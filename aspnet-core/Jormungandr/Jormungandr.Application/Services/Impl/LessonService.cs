using AutoMapper;
using Jormungandr.Application.Models;
using Jormungandr.Application.Models.Lesson;
using Jormungandr.Core.Entities;
using Jormungandr.Core.Exceptions;
using Jormungandr.DataAccess.Repositories;
using Jormungandr.Shared.Services;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Jormungandr.Application.Services.Impl;
public class LessonService : ILessonService
{
    private readonly IMapper _mapper;
    private readonly ILessonRepository _lessonRepository;
    private readonly IClaimService _claimService;

    public LessonService(ILessonRepository lessonRepository,
        IMapper mapper,
        IClaimService claimService)
    {
        _lessonRepository = lessonRepository;
        _mapper = mapper;
        _claimService = claimService;
    }

    public async Task<IEnumerable<LessonResponseModel>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var lessons = (await _lessonRepository.GetAllAsync(e => e.Id != Guid.Empty))
            .Include(e => e.Teacher);

        return _mapper.Map<IEnumerable<LessonResponseModel>>(lessons);
    }

    public async Task<IEnumerable<LessonResponseModel>> GetAllByUserAsync(CancellationToken cancellationToken = default)
    {
        if (_claimService.GetClaim(ClaimTypes.Role) == "Admin")
        {
            return await GetAllAsync();
        }

        var lessons = (await _lessonRepository.GetAllAsync(e => e.TeacherId == new Guid(_claimService.GetUserId())))
            .Include(e => e.Teacher);

        return _mapper.Map<IEnumerable<LessonResponseModel>>(lessons);
    }

    public async Task<LessonResponseModel> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lesson = await (await _lessonRepository.GetAllAsync(e => e.Id == id))
            .Include(e => e.Teacher)
            .FirstOrDefaultAsync();

        return _mapper.Map<LessonResponseModel>(lesson);
    }

    public async Task<CreateLessonResponseModel> CreateAsync(CreateLessonModel createLessonModel,
        CancellationToken cancellationToken = default)
    {
        var anyLesson = (await _lessonRepository.GetAllAsync(e => e.TeacherId == createLessonModel.TeacherId && e.Name == createLessonModel.Name)).Any();
        if (anyLesson) { throw new ConflictException("Lesson already exists."); }

        var lesson = _mapper.Map<Lesson>(createLessonModel);

        var addedLesson = await _lessonRepository.AddAsync(lesson);

        return new CreateLessonResponseModel
        {
            Id = addedLesson.Id
        };
    }

    public async Task<UpdateLessonResponseModel> UpdateAsync(Guid id, UpdateLessonModel updateLessonModel,
        CancellationToken cancellationToken = default)
    {
        var lessons = await _lessonRepository.GetFirstAsync(ti => ti.Id == id);

        _mapper.Map(updateLessonModel, lessons);

        return new UpdateLessonResponseModel
        {
            Id = (await _lessonRepository.UpdateAsync(lessons)).Id
        };
    }

    public async Task<BaseResponseModel> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lessons = await (await _lessonRepository.GetAllAsync(ti => ti.Id == id)).Include(e => e.LessonStudents).FirstOrDefaultAsync();

        return new BaseResponseModel
        {
            Id = (await _lessonRepository.DeleteAsync(lessons)).Id
        };
    }
}
