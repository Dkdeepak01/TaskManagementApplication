﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApplication.Core.Domain.Entities
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ?Description { get; set; }
        public string AssignedUser { get; set; }
        public DateTime DueDate { get; set; }
        public string? Status { get; set; } = "Pending";
    }
}
