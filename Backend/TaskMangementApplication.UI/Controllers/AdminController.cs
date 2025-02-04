using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApplication.Core.Domain.Entities;
using TaskManagementApplication.Core.DTO;
using TaskManagementApplication.Core.Services;

namespace TaskMangementApplication.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _taskService;
        private readonly UserService _userService;

        public AdminController(AdminService taskService, UserService userService)
        {
            _taskService = taskService;
            _userService = userService;
        }

        [HttpGet("GetAllTask")]
        [Authorize]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _taskService.GetTasksAsync();
            return Ok(tasks);
        }

        [HttpPost("CreateTask")]
        [Authorize]
        public async Task<IActionResult> CreateTask([FromBody] TaskDto taskDto)
        {
            var task = new TaskItem
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                DueDate = taskDto.DueDate,
                Status = "Pending",
                AssignedUser = taskDto.AssignedUser
            };

            await _taskService.AddTaskAsync(task);
            return Ok("Task created successfully");
        }

        [HttpPut("UpdateTaskStatus{taskId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTaskStatus(int taskId, [FromBody] string status)
        {
            var task = await _taskService.GetTaskByIdAsync(taskId);
            if (task == null) return NotFound();

            task.Status = status;
            await _taskService.UpdateTaskAsync(task);
            return Ok("Task status updated");
        }
        [HttpPut("EditTask{taskId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditTask(int taskId, [FromBody] TaskDto task)
        {
            var tasks = await _taskService.GetTaskByIdAsync(taskId);
            if (task == null) return NotFound();

            tasks.Title = task.Title;
            tasks.Description = task.Description;
            tasks.DueDate = task.DueDate;
            tasks.Status = task.Status;
            tasks.AssignedUser = task.AssignedUser;

             await _taskService.UpdateTaskAsync(tasks);
            return Ok("Task Edited Successfully");
        }
        [HttpDelete("DeleteTask{taskId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            var task = await _taskService.GetTaskByIdAsync(taskId);
            if (task == null) return NotFound();

            await _taskService.DeleteTaskAsync(taskId);
            return Ok("Task deleted successfully");
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }



        [HttpGet("SearchTask")]
        [Authorize]
        public async Task<IActionResult> SearchTasks(string title = null, string status = null, DateTime? dueDate = null)
        {
            var tasks = await _taskService.SearchTasksAsync(title, status, dueDate);
            return Ok(tasks);
        }
    }
}

