/* eslint-disable react-hooks/exhaustive-deps */
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import OrderCard from "../../components/orderCard";
import fetcher from "../../lib/fetcher";
import prisma from "../../lib/prisma";

let socket;
let isloading = false;

const History = ({ orders }) => {
  const setOrders = useStoreActions((actions: any) => actions.setOrders);
  const orderList = useStoreState((state: any) => {
    return state.orders;
  });
  const [selectedId, setSelectedId] = useState(0);
  // const [orderList, setOrderList] = useState([]);

  const getOrders = async () => {
    if (isloading) return;
    isloading = true;
    try {
      const response = await fetcher("/order");
      setOrders(response);
      isloading = false;
    } catch (error) {
      isloading = false;
      console.error(error);
    }
  };

  useEffect(() => {
    setOrders(orders);
    fetch("/api/socket");
    socket = io();

    socket.on("order-finished", async (id) => {
      await getOrders();
    });

    socket.on("new-order", async () => {
      await getOrders();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onConfirm = async (id) => {
    try {
      await fetcher(
        "/finished",
        {
          id,
        },
        "DELETE"
      );

      socket.emit("order-finished", id);
      await getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 mb-5 w-full">
      <div className="text-xl font-bold">History page</div>
      <hr className=" my-4" />
      {isloading}
      <div className="lg:flex lg:flex-wrap lg:justify-center">
        {orderList.map((order) => {
          return (
            <div className="animate-in fade-in  duration-300">
              <OrderCard
                key={order.id}
                order={order}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                onConfirm={onConfirm}
              />
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
