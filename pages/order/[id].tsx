/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBack from "@mui/icons-material/ArrowBack";

import axios from "axios";
import SearchBar from "../../components/search/base/searchBar";
import prisma from "../../lib/prisma";
import fetcher from "../../lib/fetcher";
import CardMini from "../../components/cardMini";
import LoadingScreen from "../../components/loadingScreen";

const OrderProcess = ({ menu }) => {
  // STORE
  const setLoading = useStoreActions((actions: any) => actions.setLoading);
  const clearLoading = useStoreActions((actions: any) => actions.clearLoading);
  const loading = useStoreState((state: any) => state.isLoading);
  const router = useRouter();

  const icon = {
    coffee: { path: "/Coffee_cup.svg", width: 60 },
    soda: { path: "/Soda.svg", width: 40 },
    tea: { path: "/Tea.svg", width: 60 },
  };

  const sweetLevel = [0, 50, 100];

  const [username, setUsername] = useState("");
  const [sweet, setSweet] = useState(0);
  const [optional, setOptional] = useState("");
  const [type, setType] = useState(menu.type === "coffee" ? "Hot" : null);
  const [isInvalid, setIsInvalid] = useState(true);

  const searchUsername = (name) => {
    setUsername(name);
    setIsInvalid(!name);
  };

  const submitOrder = async () => {
    setLoading();

    const requestBody = {
      orderBy: username,
      sweet,
      coffeeId: +router.query.id,
      description: optional,
      type,
    };

    try {
      const response = await fetcher("/order", requestBody);

      window.localStorage.setItem("orderId", response.id);

      clearLoading();
      await axios.post("/api/pusher/new-order", {
        ...response,
        ...{ Coffee: menu },
        ...{ new: true },
      });
      router.push({ pathname: "/history" });
    } catch (error) {
      clearLoading();
      console.error(error);
    }
  };

  const deleteCoffee = async () => {
    setLoading();
    try {
      await fetcher("/coffee", { id: menu.id }, "DELETE");
      // await axios.delete(`/api/coffee/${menu.id}`);
      clearLoading();
      router.push({ pathname: "/order" });
    } catch (error) {
      clearLoading();
      console.error(error);
    }
  };

  return (
    <div className="max-w-[420px] w-full relative h-[960px]">
      <div className="flex justify-center items-center min-h-[280px] flex-col bg-secondary relative">
        <div className="absolute top-2 left-2">
          <button
            className="w-[40px] h-[40px] bg-primary text-white rounded-full shadow-lg"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowBack />
          </button>
        </div>
        <div className="absolute top-2 right-2">
          <button
            className="w-[40px] h-[40px] bg-error text-white rounded-full shadow-lg"
            onClick={deleteCoffee}
          >
            <DeleteIcon />
          </button>
        </div>
        <img
          alt="coffee"
          className={`w-[30%] max-w-[${icon[menu.type].width}]`}
          src={icon[menu.type].path}
        />
      </div>

      <div className="w-full bg-white">
        <div className="p-4 relative">
          <div className="text-4xl font-bold">{menu.menuName}</div>
          <hr className="mt-4" />

          <div>
            {menu.type === "coffee" && (
              <div>
                <b className="text-lg mt-2">Type</b>
                <div className="flex mt-4  justify-between space-x-2">
                  {[{ type: "Hot" }, { type: "Iced" }].map((orderType) => (
                    <CardMini
                      key={orderType.type}
                      isSelected={type === orderType.type}
                      item={orderType.type}
                      selectedCard={setType}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <b className="text-lg">Sweetness</b>
              <div className="flex mt-2 justify-between space-x-2">
                {sweetLevel.map((s) => (
                  <CardMini
                    key={s}
                    isSelected={sweet === s}
                    item={s}
                    selectedCard={setSweet}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <b className="text-xl">Order by</b>
              <div className="mt-2">
                <SearchBar onSubmit={(name) => searchUsername(name)} />
                {/* {isShowSearch ? (
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
                        <div
                          key={user.name}
                          tabIndex={0}
                          className="p-3"
                          role="menuitem"
                        >
                          {user.name}
                        </div>
                      );
                    })}
                  </div>
                )} */}
              </div>
            </div>

            <div className="mt-8">
              <b className="text-xl">Optional note</b>
              <div className="mt-2">
                <textarea
                  className="border w-full p-3 rounded"
                  onChange={(e) => setOptional(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[20px]  flex justify-center items-center w-[390px]">
        <button
          disabled={isInvalid}
          type="submit"
          className=" w-11/12 p-4 bg-secondary rounded-2xl disabled:bg-gray shadow-[0px_10px_rgb(0,0,0)]"
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
