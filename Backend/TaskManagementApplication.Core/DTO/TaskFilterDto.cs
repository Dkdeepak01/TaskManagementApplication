using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApplication.Core.DTO
{
    public class TaskFilterDto
    {
        public string Title { get; set; }
        public string Status { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
