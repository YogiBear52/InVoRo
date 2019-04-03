namespace Invoro.Api.src.Authentication
{
    public class User
    {
        public string Identifier { get; private set; }

        public User(string identifier)
        {
            this.Identifier = identifier;
        }
    }
}
