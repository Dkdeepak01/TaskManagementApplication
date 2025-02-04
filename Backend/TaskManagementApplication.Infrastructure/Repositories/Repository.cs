using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManagementApplication.Infrastructure.Data;
using TaskManagementApplication.Core.Domain.Interfaces;
using TaskManagementApplication.Core.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TaskManagementApplication.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDbContext _context;

        public Repository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }


       

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<User?> GetTasksByUserAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(q=>q.Username == username);
             
        }

        public async Task<User?> ValidateUser(string UserId, string Password)
        {
            return await _context.Users.FirstOrDefaultAsync(q=>q.Username==UserId && q.Password==Password);
        }



        public async Task<List<T>> GetAllUserAsync()
        {
           
           return await _context.Set<T>().ToListAsync();
            
        }

    }
}

