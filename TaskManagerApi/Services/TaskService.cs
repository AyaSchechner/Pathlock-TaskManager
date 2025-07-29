using TaskManagerApi.Models;

namespace TaskManagerApi.Services
{
    public class TaskService : ITaskService
    {
        private static readonly Dictionary<Guid, TaskItem> _tasks = new();

        /// <summary>
        /// Retrieves all tasks
        /// </summary>
        public List<TaskItem> GetTasks()
        {
            return _tasks.Values.ToList();
        }

        /// <summary>
        /// Adds a new task
        /// </summary>
        public void Add(TaskItem task)
        {
            task.Id = Guid.NewGuid();
            task.CreatedAt = DateTime.UtcNow;
            _tasks[task.Id] = task; 
        }

        /// <summary>
        /// Updates a task's completion status
        /// </summary>
        public bool Update(Guid id, TaskItem updatedTask)
        {
            if (!_tasks.ContainsKey(id)) return false;

            var existingTask = _tasks[id];
            existingTask.IsCompleted = updatedTask.IsCompleted;
            return true;
        }

        /// <summary>
        /// Deletes a task by ID
        /// </summary>
        public bool Delete(Guid id)
        {
            return _tasks.Remove(id);
        }
    }
}
