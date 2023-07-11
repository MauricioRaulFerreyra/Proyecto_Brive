namespace WebApiBootcamp.Models
{
    public class User
    {
        public int IdUser { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }

        public User() { }
        public User(int IdUser,string UserName,string Password) 
        {
            this.IdUser = IdUser;
            this.UserName = UserName;
            this.Password = Password;
        }
    }
}
