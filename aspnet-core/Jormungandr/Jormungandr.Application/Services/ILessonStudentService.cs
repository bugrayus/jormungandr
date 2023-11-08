using Jormungandr.Application.Models;
using Jormungandr.Application.Models.LessonStudent;

namespace Jormungandr.Application.Services;
public interface ILessonStudentService
{
    Task<CreateLessonStudentResponseModel> CreateAsync(CreateLessonStudentModel createLessonStudentModel,
        CancellationToken cancellationToken = default);

    Task<BaseResponseModel> DeleteAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IEnumerable<LessonStudentResponseModel>>
        GetAllAsync(CancellationToken cancellationToken = default);

    Task<IEnumerable<LessonStudentResponseModel>>
        GetAllByUserAsync(CancellationToken cancellationToken = default);

    Task<IEnumerable<LessonStudentResponseModel>>
        GetAllByLessonAsync(Guid lessonId, CancellationToken cancellationToken = default);

    Task<LessonStudentResponseModel>
        GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<UpdateLessonStudentResponseModel> UpdateAsync(Guid id, UpdateLessonStudentModel updateLessonStudentModel,
        CancellationToken cancellationToken = default);

    Task<UpdateLessonStudentScoreResponseModel> UpdateScoreAsync(Guid id, UpdateLessonStudentScoreModel updateLessonStudentModel,
        CancellationToken cancellationToken = default);
}
