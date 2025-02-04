using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
using TaskManagementApplication.Core.Configuration;
using TaskManagementApplication.Core.Domain.Entities;
using TaskManagementApplication.Core.Domain.Interfaces;
using TaskManagementApplication.Core.Services;
using TaskManagementApplication.Infrastructure.Data;
using TaskManagementApplication.Infrastructure.Repositories;
using TaskMangementApplication.UI.Filters;
using TaskMangementApplication.UI.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Serilog Configuration
builder.Host.UseSerilog((context, configuration) =>
{
    configuration.ReadFrom.Configuration(context.Configuration);
});

var services = builder.Services;

// Configuration
services.Configure<ApplicationConfiguration>(builder.Configuration.GetSection("ApplicationSettings"));

// Database
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection
services.AddScoped<IRepository<User>, Repository<User>>();
services.AddScoped<IRepository<TaskItem>, Repository<TaskItem>>();
services.AddScoped<IRepository<Role>, Repository<Role>>();
services.AddScoped<UserService>();
services.AddScoped<AuthService>();
services.AddScoped<AdminService>();
services.AddScoped<RoleService>();

// JWT Authentication & Authorization
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
services.AddAuthorization();

services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
});

services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Task Management API",
        Version = "v1",
        Description = "API for managing tasks",
    });

    // Add JWT Authentication to Swagger
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        //Description = "Enter 'Bearer' [space] and then your token in the text input below.\n\nExample: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...'"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

services.AddScoped<AuthorizationFilter>();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Swagger Configuration
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task Management API v1");
});

// Custom Middleware
app.UseMiddleware<ErrorHandlingMiddleware>();

// Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();
