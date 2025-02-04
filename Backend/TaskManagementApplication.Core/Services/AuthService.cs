using System;
using System.Threading.Tasks;
using TaskManagementApplication.Core.Domain.Entities;
using TaskManagementApplication.Core.Domain.Interfaces;





namespace TaskManagementApplication.Core.Services
{
    public class AuthService
    {
        private readonly IRepository<User> _userRepository;

        public AuthService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        // Register a new user
        public async Task<bool> RegisterAsync(User user)
        {
            var existingUser = await _userRepository.GetByConditionAsync(u => u.Username == user.Username);
            if (existingUser.Any() )
            {
                return false;
            }
            else
            {
                await _userRepository.AddAsync(user);
                return true;
            }


            
        }

        // Validate user credentials
        public async Task<User> ValidateUserAsync(string username, string password)
        {
            var users = await _userRepository.ValidateUser(username, password);
            return (User)users;
        }

    }
}
