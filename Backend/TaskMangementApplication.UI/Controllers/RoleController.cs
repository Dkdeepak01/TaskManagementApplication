using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApplication.Core.Services;

namespace TaskMangementApplication.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RoleController(RoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignRole(int userId, [FromBody] string role)
        {
            try
            {
                var result = await _roleService.AssignRoleToUserAsync(userId, role);
                if (result) return Ok("Role assigned successfully");

                return BadRequest("Role assignment failed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }
    }

}