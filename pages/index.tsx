import { useEffect, useState } from "react";
import fetcher from "../lib/fetcher";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const users = await fetcher("/users");
      setUsers(users);
      console.log(users);
    };
    getUser();
  }, []);

  return (
    <div>
      {users && users.length ? (
        <div>
          <div className="text-3xl font-bold">User list</div>
          {users.map((user) => (
            <div className="flex" key={user.id}>
              <img
                className="w-[50px] h-[50px] rounded-full text-xl"
                src={user.avatar}
              />
              <span className="font-bold">#{user.id}</span>
              <span className="font-bold">{user.name}</span>
            </div>
          ))}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Home;
