using System.ComponentModel.DataAnnotations;

namespace TaskManagerApi.Models;

public class TaskItem
{
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Description is required.")]
    [StringLength(100, ErrorMessage = "Description must be at most 100 characters.")]
    public string? Description { get; set; }

    public bool IsCompleted { get; set; }
    
    public DateTime CreatedAt { get; set; }
}
