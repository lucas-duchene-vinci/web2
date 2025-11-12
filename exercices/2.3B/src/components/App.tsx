import type { User } from "../../types";
import UserCard from "./UserCard";
import PageTitle from "./PageTitle";
import Footer from "./Footer";

const App = () => {
  const title = "Welcome to My App";

  const users: User[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
  ];

  const footerText = "© 2023 My App";

  return (
    <div>
      <PageTitle title={title} />
      {users.map((user) => (
        <UserCard user={user} />
      ))}
      <Footer text={footerText} />
    </div>
  );
};

export default App;
