using System.Threading.Tasks;
using TaskManagementApplication.Core.Domain.Entities;
using TaskManagementApplication.Core.Domain.Interfaces;

namespace TaskManagementApplication.Core.Services
{
    public class RoleService
    {
        private readonly IRepository<User> _userRepository;

        public RoleService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> AssignRoleToUserAsync(int userId, string role)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            user.Role = role;
            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<List<string>> GetRolesAsync()
        {
            return await Task.FromResult(new List<string> { "Admin", "User" });
        }
    }
}