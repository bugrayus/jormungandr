using Jormungandr.Core.Entities;
using Jormungandr.DataAccess.Persistence;

namespace Jormungandr.DataAccess.Repositories.Impl;
public class LessonStudentRepository : BaseRepository<LessonStudent>, ILessonStudentRepository
{
    public LessonStudentRepository(DatabaseContext context) : base(context) { }
}