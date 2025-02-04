using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementApplication.Core.Domain.Entities;
using TaskManagementApplication.Core.Domain.Interfaces;

namespace TaskManagementApplication.Core.Services
{
    public class UserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<User> GetTaskByIdAsync(int taskId)
        {
            return await _userRepository.GetByIdAsync(taskId);
        }

        public async Task UpdateTaskAsync(User task)
        {
            if (task == null)
                throw new ArgumentNullException(nameof(task));

            await _userRepository.UpdateAsync(task);
        }

        public async Task<User> GetTasksByUserAsync(string? username)
        {
            return await _userRepository.GetTasksByUserAsync(username);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return (await _userRepository.GetAllUserAsync()).ToList();
        }
    }
}