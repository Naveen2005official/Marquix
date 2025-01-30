using Microsoft.EntityFrameworkCore;
using MMS_API.Models;
using System.Security.Cryptography.X509Certificates;

namespace MMS_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Marks> MarkDetails { get; set; }
        public DbSet<Students> StudentLogin { get; set; }
        public DbSet<Staffs> StaffLogin { get; set; }
    }
}
