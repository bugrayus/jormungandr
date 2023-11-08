namespace Jormungandr.Core.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message) : base(message) { }
    public NotFoundException(Type type) : base($"{type} is missing") { }
}
