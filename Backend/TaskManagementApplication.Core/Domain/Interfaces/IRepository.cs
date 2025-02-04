using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TaskManagementApplication.Core.Domain.Entities;

namespace TaskManagementApplication.Core.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();  // Get all entities
        Task<T> GetByIdAsync(int id);        // Get a specific entity by its ID
                                            
        Task<User> GetTasksByUserAsync(string username);

        Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> predicate);  // Get entities based on a condition
        Task AddAsync(T entity);             // Add a new entity
        Task UpdateAsync(T entity);          // Update an existing entity
        Task DeleteAsync(int id);            // Delete an entity by ID
        Task<User> ValidateUser(string UserId, string Password);
        Task<List<T>> GetAllUserAsync();// Delete an entity by ID
    }
}
