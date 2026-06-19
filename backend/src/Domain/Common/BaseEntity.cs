using System.ComponentModel.DataAnnotations.Schema;

namespace CopilotInterview.Domain.Common;

/// <summary>Base type for all entities. Carries identity and a buffer of domain events.</summary>
public abstract class BaseEntity
{
    public Guid Id { get; protected set; }

    private readonly List<IDomainEvent> _domainEvents = [];

    [NotMapped]
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void AddDomainEvent(IDomainEvent domainEvent) => _domainEvents.Add(domainEvent);

    public void ClearDomainEvents() => _domainEvents.Clear();
}

/// <summary>Marker for aggregate roots — the only entities referenced from outside their aggregate.</summary>
public interface IAggregateRoot;
