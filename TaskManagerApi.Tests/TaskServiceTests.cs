using System;
using System.Collections.Generic;
using TaskManagerApi.Models;
using TaskManagerApi.Services;
using Xunit;

namespace TaskManagerApi.Tests
{
    public class TaskServiceTests
    {
        private readonly ITaskService _taskService;

        public TaskServiceTests()
        {
            _taskService = new TaskService();
        }

        [Fact]
        public void Add_Task_ShouldBeRetrievable()
        {
            // Arrange
            var task = new TaskItem { Description = "Test task" };

            // Act
            _taskService.Add(task);
            var tasks = _taskService.GetTasks();

            // Assert
            Assert.Contains(tasks, t => t.Description == "Test task");
        }

        [Fact]
        public void Update_TaskCompletionStatus_ShouldChange()
        {
            // Arrange
            var task = new TaskItem { Description = "Update me", IsCompleted = false };
            _taskService.Add(task);
            var addedTask = _taskService.GetTasks().Find(t => t.Description == "Update me");
            Assert.NotNull(addedTask); // Null check before using it

            var update = new TaskItem { IsCompleted = true };

            // Act
            var success = _taskService.Update(addedTask!.Id, update); // use ! since we validated it above
            var updatedTask = _taskService.GetTasks().Find(t => t.Id == addedTask.Id);

            // Assert
            Assert.True(success);
            Assert.NotNull(updatedTask);
            Assert.True(updatedTask!.IsCompleted);
        }

        [Fact]
        public void Delete_Task_ShouldRemoveSuccessfully()
        {
            // Arrange
            var task = new TaskItem { Description = "Delete me" };
            _taskService.Add(task);
            var addedTask = _taskService.GetTasks().Find(t => t.Description == "Delete me");
            Assert.NotNull(addedTask);

            // Act
            var deleted = _taskService.Delete(addedTask!.Id);
            var stillExists = _taskService.GetTasks().Exists(t => t.Id == addedTask.Id);

            // Assert
            Assert.True(deleted);
            Assert.False(stillExists);
        }

        [Fact]
        public void Update_NonexistentTask_ShouldReturnFalse()
        {
            // Arrange
            var fakeId = Guid.NewGuid();
            var update = new TaskItem { IsCompleted = true };

            // Act
            var success = _taskService.Update(fakeId, update);

            // Assert
            Assert.False(success);
        }
    }
}
