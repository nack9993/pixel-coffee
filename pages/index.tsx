import Router from "next/router";
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

  const handleClick = (e) => {
    e.preventDefault();
    Router.push('/order');
  };

  return (
    // <div>
    //   {users && users.length ? (
    //     <div>
    //       <div className="text-3xl font-bold">User list</div>
    //       {users.map((user) => (
    //         <div className="flex" key={user.id}>
    //           <img
    //             className="w-[50px] h-[50px] rounded-full text-xl"
    //             src={user.avatar}
    //           />
    //           <span className="font-bold">#{user.id}</span>
    //           <span className="font-bold">{user.name}</span>
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     "Loading"
    //   )}
    // </div>
    <div className="flex justify-center items-center h-screen bg-neutral flex-col">
      <img className="p-10" width={300} src="cup.svg" />
      <div className="text-5xl font-bold text-secondary">PIXEL CAFE</div>

      <div className="mt-10">
        <button
          className="p-4 bg-secondary shadow-2xl rounded-md text-white font-bold"
          onClick={handleClick}
        >
          Let's order
        </button>
      </div>
    </div>
  );
};

export default Home;
