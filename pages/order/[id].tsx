/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import SearchBar from "../../components/search/base/searchBar";
import prisma from "../../lib/prisma";
import fetcher from "../../lib/fetcher";
import CardMini from "../../components/cardMini";
import LoadingScreen from "../../components/loadingScreen";

const OrderProcess = ({ menu }) => {
  const setLoading = useStoreActions((actions: any) => actions.setLoading);
  const clearLoading = useStoreActions((actions: any) => actions.clearLoading);
  const loading = useStoreState((state: any) => state.isLoading);
  const router = useRouter();

  const icon = {
    coffee: { path: "../Coffee_cup.svg" },
    soda: { path: "../Soda.svg" },
    tea: { path: "../Tea.svg" },
  };

  const sweetLevel = [0, 50, 100];

  const users = [{ name: "Nack" }, { name: "Kookai" }];
  const [username, setUsername] = useState("");
  const [sweet, setSweet] = useState(0);

  const [isUnvalid, setIsUnvalid] = useState(true);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const searchUsername = (name) => {
    setUsername(name);
    setIsUnvalid(!name);
    setIsShowSearch(!name);
  };

  const submitOrder = async () => {
    setLoading();

    try {
      await fetcher("/order", {
        orderBy: username,
        sweet,
        coffeeId: +router.query.id,
      });
      clearLoading();
      router.push({ pathname: "/history" });
    } catch (error) {
      clearLoading();
      console.error(error);
    }
  };

  return (
    <div className="max-w-[420px] w-full relative h-screen">
      <div className="flex justify-center items-center min-h-[260px] flex-col bg-secondary ">
        <img
          alt="coffee"
          className="w-[30%] max-w-[140px]"
          src={icon[menu.type].path}
        />
      </div>

      <div className="w-full bg-white">
        <div className="p-4 relative">
          <div className="text-4xl font-bold">{menu.menuName}</div>
          <hr className="mt-4" />

          <div>
            <b className="text-lg mt-2">Sweetness</b>
            <div className="flex mt-4  justify-between">
              {sweetLevel.map((s) => (
                <CardMini
                  key={s}
                  isSelected={sweet === s}
                  item={s}
                  selectedCard={setSweet}
                />
              ))}
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

      <div className="fixed bottom-[15px]  flex justify-center items-center w-[390px]">
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
      {loading && <LoadingScreen />}
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const menu = await prisma.coffee.findUnique({ where: { id: +query.id } });

  return { props: { menu } };
};

export default OrderProcess;
