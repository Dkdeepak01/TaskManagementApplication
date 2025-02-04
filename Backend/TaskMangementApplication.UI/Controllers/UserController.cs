using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApplication.Core.Services;

namespace TaskMangementApplication.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        //[HttpGet("{Username}")]
        //public async Task<IActionResult> GetUser(string username)
        //{
        //    var user = await _userService.GetUserAsync(username);
        //    if (user == null) return NotFound();
        //    return Ok(user);
        //}

        //[HttpGet("GetAllUsers")]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> GetAllUsers()
        //{
        //    var users = await _userService.GetAllUsersAsync();
        //    return Ok(users);
        //}

        [HttpGet("ViewTaskStatus")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetAssignedTasks()
        {
            var username = User.Identity?.Name;
            var tasks = await _userService.GetTasksByUserAsync(username);
            return Ok(tasks);
        }

        [HttpPut("UpdateTaskStatus{taskId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateTaskStatus(int taskId, [FromBody] string status)
        {
            var task = await _userService.GetTaskByIdAsync(taskId);
            if (task == null) return NotFound();

            task.Status = status;
            await _userService.UpdateTaskAsync(task);
            return Ok("Task status updated");
        }


    }
}