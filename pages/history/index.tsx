/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import prisma from "../../lib/prisma";

let socket;

const History = ({ orders }) => {
  const icon = {
    coffee: { path: "/../Coffee_cup.svg" },
    soda: { path: "/../Soda.svg" },
    tea: { path: "/../Tea.svg" },
  };
  const [selectedId, setSelectedId] = useState(0);
  const [orderList, setOrderList] = useState(orders);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    console.log(io());

    socket.on("connect", () => {});

    socket.on("hello", (arg) => {
      console.log(arg);
    });

    socket.on("update-order", (id) => {
      setOrderList(orderList.filter((order) => order.id !== id));
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const onConfirm = (id) => {
    socket.emit("order-finished", id);
  };

  return (
    <div className="p-4 w-full">
      <div className="text-xl font-bold">Order page</div>
      <hr className=" my-4" />
      <div className="lg:flex lg:flex-wrap lg:justify-center">
        {orderList.map((order) => {
          return (
            <div
              key={order.id}
              className="animate-in slide-in-from-left-75  lg:m-4"
            >
              <div
                role="menuitem"
                className={`p-4 mb-5 rounded-lg border border-gray  shadow-[0px_10px_rgb(0,0,0)] ${
                  order.id === selectedId ? "border-primary" : ""
                }`}
                onClick={() => {
                  setSelectedId(order.id);
                }}
                tabIndex={0}
                aria-hidden="true"
              >
                <div className="flex justify-between">
                  <div className="font-bold text-xl mb-2">
                    Order #{order.id}
                  </div>
                  {/* <Image
                    alt=""
                    className="rounded-full"
                    src={order.User.avatar}
                    width={50}
                    height={50}
                  /> */}
                  <div className="w-[50px] h-[50px] bg-primary text-white rounded-full flex justify-center items-center">
                    {String(order.orderBy).toLocaleUpperCase().split("")[0]}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex w-full">
                    <Image
                      src={icon[order.Coffee.type].path}
                      width={80}
                      height={80}
                    />
                    <div className="ml-4 w-full">
                      <div className="font-bold text-md">
                        {order.Coffee.menuName}{" "}
                      </div>
                      <div className="text-sm">Hot, Sweet 50%</div>

                      <div className="mt-4 flex justify-between w-full">
                        <button
                          type="button"
                          className="py-2 px-7 bg-primary text-white rounded-xl text-sm "
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="py-2 px-12 bg-secondary rounded-xl text-sm border border-primary"
                          onClick={() => {
                            onConfirm(order.id);
                          }}
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const orders = await prisma.order.findMany({
    include: {
      Coffee: true,
    },
  });

  return { props: { orders } };
};

export default History;
