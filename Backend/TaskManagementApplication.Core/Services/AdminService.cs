using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementApplication.Core.Domain.Entities;
using TaskManagementApplication.Core.Domain.Interfaces;

namespace TaskManagementApplication.Core.Services
{
    public class AdminService
    {
        private readonly IRepository<TaskItem> _taskRepository;

        public AdminService(IRepository<TaskItem> taskRepository)
        {
            _taskRepository = taskRepository;
        }

        // Get all tasks
        public async Task<IEnumerable<TaskItem>> GetTasksAsync()
        {
            return await _taskRepository.GetAllAsync();
        }

        // Add a new task
        public async Task AddTaskAsync(TaskItem task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            task.Status = "Pending"; 
            await _taskRepository.AddAsync(task);
        }

        // Update an existing task
        public async Task UpdateTaskAsync(TaskItem task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            await _taskRepository.UpdateAsync(task);
        }

        // Delete a task by ID
        public async Task DeleteTaskAsync(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            if (task == null)
                throw new KeyNotFoundException("Task not found");

            await _taskRepository.DeleteAsync(id);
        }

        // Get a task by ID
        public async Task<TaskItem> GetTaskByIdAsync(int id)
        {
            return await _taskRepository.GetByIdAsync(id);
        }

        // Get tasks assigned to a specific user
        public async Task<IEnumerable<TaskItem>> GetTasksByUserAsync(string username)
        {
            if (string.IsNullOrEmpty(username))
                throw new ArgumentException("Username cannot be null or empty", nameof(username));

            var tasks = await _taskRepository.GetAllAsync();
            return tasks.Where(t => t.AssignedUser == username);
        }

        // Search tasks by title, status, or due date
        public async Task<IEnumerable<TaskItem>> SearchTasksAsync(string title = null, string status = null, DateTime? dueDate = null)
        {
            var tasks = await _taskRepository.GetAllAsync();

            if (!string.IsNullOrEmpty(title))
                tasks = tasks.Where(t => t.Title.Contains(title, StringComparison.OrdinalIgnoreCase));

            if (!string.IsNullOrEmpty(status))
                tasks = tasks.Where(t => t.Status.Equals(status, StringComparison.OrdinalIgnoreCase));

            if (dueDate.HasValue)
                tasks = tasks.Where(t => t.DueDate.Date == dueDate.Value.Date);

            return tasks;
        }
        //public async Task<TaskItem> GetAllTaskByDueDate(DateTime dateTime)
        //{
        //    return await _taskRepository.GetByDueDate(dateTime);
        //}
        //public async Task<TaskItem> GetAllTaskByStatus(string status)
        //{
        //    return await _taskRepository.GetByStatus(status);
        //}
       
    }
}
