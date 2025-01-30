namespace MMS_API.DTO
{
    public class MarksUpdateDTO
    {
        public string Name { get; set; }
        public int Rollno { get; set; }
        public string[] Subjects { get; set; }
        public float Cgpa { get; set; }
        public float Percentage { get; set; }
    }
}
