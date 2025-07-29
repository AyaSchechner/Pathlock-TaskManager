using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;
using TaskManagerApi.Services;

namespace TaskManagerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        /// <summary>
        /// Returns all tasks
        /// </summary>
        [HttpGet]
        public IActionResult GetTasks()
        {
            return Ok(_taskService.GetTasks());
        }

        /// <summary>
        /// Adds a new task
        /// </summary>
        [HttpPost]
        public IActionResult AddTask([FromBody] TaskItem task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _taskService.Add(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        /// <summary>
        /// Updates an existing task
        /// </summary>
        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, [FromBody] TaskItem updatedTask)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var success = _taskService.Update(id, updatedTask);
            return success ? NoContent() : NotFound();
        }

        /// <summary>
        /// Deletes a task by ID
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            var success = _taskService.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
