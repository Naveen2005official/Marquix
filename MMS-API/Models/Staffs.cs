using System.ComponentModel.DataAnnotations;

namespace MMS_API.Models
{
    public class Staffs
    {
        [Key]
        public int Id { get; set; }
        public string Staffid { get; set; }
        public string Password { get; set; }
    }
}
