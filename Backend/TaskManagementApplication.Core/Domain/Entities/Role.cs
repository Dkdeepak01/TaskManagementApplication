﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagementApplication.Core.Domain.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } // Admin, User
        public string ?Description { get; set; }
    }
}
