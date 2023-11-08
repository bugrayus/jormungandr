using AutoMapper;
using Jormungandr.Application.Models;
using Jormungandr.Application.Models.LessonStudent;
using Jormungandr.Core.Entities;
using Jormungandr.DataAccess.Repositories;
using Jormungandr.Shared.Services;
using Microsoft.EntityFrameworkCore;

namespace Jormungandr.Application.Services.Impl;
public class LessonStudentService : ILessonStudentService
{
    private readonly IMapper _mapper;
    private readonly ILessonStudentRepository _lessonStudentRepository;
    private readonly IClaimService _claimService;

    public LessonStudentService(ILessonStudentRepository lessonStudentRepository, IClaimService claimService, IMapper mapper)
    {
        _lessonStudentRepository = lessonStudentRepository;
        _claimService = claimService;
        _mapper = mapper;
    }

    public async Task<IEnumerable<LessonStudentResponseModel>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var lessonStudents = await _lessonStudentRepository.GetAllAsync(e => e.Id != Guid.Empty);

        return _mapper.Map<IEnumerable<LessonStudentResponseModel>>(lessonStudents);
    }

    public async Task<IEnumerable<LessonStudentResponseModel>> GetAllByUserAsync(CancellationToken cancellationToken = default)
    {
        var lessonStudents = (await _lessonStudentRepository.GetAllAsync(e => e.StudentId == new Guid(_claimService.GetUserId())))
            .Include(e => e.Lesson)
            .Include(e => e.Student);

        return _mapper.Map<IEnumerable<LessonStudentResponseModel>>(lessonStudents);
    }

    public async Task<IEnumerable<LessonStudentResponseModel>> GetAllByLessonAsync(Guid lessonId, CancellationToken cancellationToken = default)
    {
        var lessonStudents = (await _lessonStudentRepository.GetAllAsync(e => e.LessonId == lessonId))
            .Include(e => e.Lesson)
            .Include(e => e.Student);

        return _mapper.Map<IEnumerable<LessonStudentResponseModel>>(lessonStudents);
    }

    public async Task<LessonStudentResponseModel> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lessonStudents = await (await _lessonStudentRepository.GetAllAsync(e => e.Id == id))
            .Include(e => e.Lesson)
            .Include(e => e.Student)
            .FirstOrDefaultAsync();

        return _mapper.Map<LessonStudentResponseModel>(lessonStudents);
    }

    public async Task<CreateLessonStudentResponseModel> CreateAsync(CreateLessonStudentModel createLessonStudentModel,
        CancellationToken cancellationToken = default)
    {
        var lessonStudent = _mapper.Map<LessonStudent>(createLessonStudentModel);
        lessonStudent.Midterm = null;
        lessonStudent.Final = null;
        lessonStudent.Makeup = null;

        var addedLessonStudent = await _lessonStudentRepository.AddAsync(lessonStudent);

        return new CreateLessonStudentResponseModel
        {
            Id = addedLessonStudent.Id
        };
    }

    public async Task<UpdateLessonStudentResponseModel> UpdateAsync(Guid id, UpdateLessonStudentModel updateLessonStudentModel,
        CancellationToken cancellationToken = default)
    {
        var lessonStudents = await _lessonStudentRepository.GetFirstAsync(ti => ti.Id == id);

        _mapper.Map(updateLessonStudentModel, lessonStudents);

        return new UpdateLessonStudentResponseModel
        {
            Id = (await _lessonStudentRepository.UpdateAsync(lessonStudents)).Id
        };
    }

    public async Task<BaseResponseModel> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var lessonStudents = await _lessonStudentRepository.GetFirstAsync(ti => ti.Id == id);

        return new BaseResponseModel
        {
            Id = (await _lessonStudentRepository.DeleteAsync(lessonStudents)).Id
        };
    }

    public async Task<UpdateLessonStudentScoreResponseModel> UpdateScoreAsync(Guid id, UpdateLessonStudentScoreModel updateLessonStudentModel, CancellationToken cancellationToken = default)
    {
        var lessonStudent = await _lessonStudentRepository.GetFirstAsync(ti => ti.Id == id);

        lessonStudent.Midterm = updateLessonStudentModel.Midterm;
        lessonStudent.Final = updateLessonStudentModel.Final;
        lessonStudent.Makeup = updateLessonStudentModel.Makeup;

        return new UpdateLessonStudentScoreResponseModel
        {
            Id = (await _lessonStudentRepository.UpdateAsync(lessonStudent)).Id
        };
    }
}
