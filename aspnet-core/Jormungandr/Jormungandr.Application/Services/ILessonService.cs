using Jormungandr.Application.Models;
using Jormungandr.Application.Models.Lesson;

namespace Jormungandr.Application.Services;
public interface ILessonService
{
    Task<CreateLessonResponseModel> CreateAsync(CreateLessonModel createLessonModel,
        CancellationToken cancellationToken = default);

    Task<BaseResponseModel> DeleteAsync(Guid id, CancellationToken cancellationToken = default);

    Task<IEnumerable<LessonResponseModel>>
        GetAllAsync(CancellationToken cancellationToken = default);

    Task<IEnumerable<LessonResponseModel>>
        GetAllByUserAsync(CancellationToken cancellationToken = default);

    Task<LessonResponseModel>
        GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<UpdateLessonResponseModel> UpdateAsync(Guid id, UpdateLessonModel updateLessonModel,
        CancellationToken cancellationToken = default);
}
