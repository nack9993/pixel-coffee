import { useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "../../components/search/base/searchBar";
import prisma from "../../lib/prisma";
import fetcher from "../../lib/fetcher";

const OrderProcess = ({ menu }) => {
  const router = useRouter();
  const icon = {
    coffee: { path: "../Coffee_cup.svg" },
    soda: { path: "../Soda.svg" },
    tea: { path: "../Tea.svg" },
  };

  const users = [{ name: "Nack" }, { name: "Kookai" }];
  const [username, setUsername] = useState("");

  const [isUnvalid, setIsUnvalid] = useState(true);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchUsername = (name) => {
    setUsername(name);
    setIsUnvalid(!name);
    setIsShowSearch(!name);
  };

  const submitOrder = async () => {
    setIsLoading(true);
    try {
      await fetcher("/order", { userId: 1, coffeeId: +router.query.id });
      router.push({ pathname: "/history" });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary max-w-[420px] w-full">
      <div className="flex justify-center items-center min-h-[300px] flex-col">
        <img
          alt="coffee"
          className="w-[35%] max-w-[150px]"
          src={icon[menu.type].path}
        />
        <div>{isLoading ? "Load" : "Not load"}</div>
      </div>

      <div className="w-full bg-white">
        <div className="p-4 relative">
          <div className="text-4xl font-bold">{menu.menuName}</div>
          <hr className="mt-4" />

          <div>
            <div className="flex mt-4  justify-between">
              <div className="cursor-pointer min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
                <div className="p-2 min-h-[80px] flex flex-col justify-center items-center">
                  <h1 className="font-bold mt-2 text-xl">0%</h1>
                </div>
              </div>

              <div className="min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
                <div className="cursor-pointer  p-2 min-h-[80px] flex flex-col justify-center items-center">
                  <h1 className="font-bold mt-2 text-xl">50%</h1>
                </div>
              </div>

              <div className="min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
                <div className=" cursor-pointer  p-2 min-h-[80px] flex flex-col justify-center items-center">
                  <h1 className="font-bold mt-2 text-xl">100%</h1>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <b className="text-xl">Order by</b>
              <div className="mt-2">
                <SearchBar onSubmit={(name) => searchUsername(name)} />
                {isShowSearch ? (
                  ""
                ) : (
                  <div className="rounded shadow-lg">
                    {users.map((user) => {
                      const convertName = String(user.name).toLocaleLowerCase();
                      const convertUserName =
                        String(username).toLocaleLowerCase();

                      if (!convertName.includes(convertUserName)) return;
                      if (convertName === convertUserName) return;
                      return (
                        <div tabIndex={0} className="p-3" role="menuitem">
                          {user.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-2  flex justify-center items-center w-[390px]">
        <button
          disabled={isUnvalid}
          type="submit"
          className=" w-11/12 p-4 bg-secondary rounded-2xl shadow-xl disabled:bg-gray"
          onClick={() => {
            submitOrder();
          }}
        >
          Order now
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const menu = await prisma.coffee.findUnique({ where: { id: +query.id } });

  return { props: { menu } };
};

export default OrderProcess;
