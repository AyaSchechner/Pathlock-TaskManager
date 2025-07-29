using TaskManagerApi.Models;

namespace TaskManagerApi.Services
{
    public interface ITaskService
    {
        List<TaskItem> GetTasks();
        void Add(TaskItem task);
        bool Update(Guid id, TaskItem updatedTask);
        bool Delete(Guid id);
    }
}
