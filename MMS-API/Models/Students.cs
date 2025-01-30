using System.ComponentModel.DataAnnotations;

namespace MMS_API.Models
{
    public class Students
    {
        [Key]
        public int Id { get; set; }
        public String Studentid { get; set; }
        public string Password { get; set; }
    }
}
