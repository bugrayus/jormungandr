using Jormungandr.Core.Entities;
using Jormungandr.DataAccess.Persistence;

namespace Jormungandr.DataAccess.Repositories.Impl;
public class LessonRepository : BaseRepository<Lesson>, ILessonRepository
{
    public LessonRepository(DatabaseContext context) : base(context) { }
}