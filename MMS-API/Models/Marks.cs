using System.ComponentModel.DataAnnotations;

namespace MMS_API.Models
{
    public class Marks
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rollno { get; set; }
        public string[] Subjects { get; set; }
        public float Cgpa { get; set; }
        public float Percentage { get; set; }
    }
}
