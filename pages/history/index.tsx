/* eslint-disable react-hooks/exhaustive-deps */
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import LoadingScreen from "../../components/loadingScreen";
import OrderCard from "../../components/orderCard";
import fetcher from "../../lib/fetcher";
import prisma from "../../lib/prisma";

let isLoadData = false;

const History = ({ orders }) => {
  const setOrders = useStoreActions((actions: any) => actions.setOrders);
  const orderList = useStoreState((state: any) => {
    return state.orders;
  });
  const [selectedId, setSelectedId] = useState(0);

  const setLoading = useStoreActions((actions: any) => actions.setLoading);
  const clearLoading = useStoreActions((actions: any) => actions.clearLoading);
  const loading = useStoreState((state: any) => state.isLoading);
  // const [orderList, setOrderList] = useState([]);

  const getOrders = async () => {
    if (isLoadData) return;
    setLoading(true);
    isLoadData = true;
    try {
      const response = await fetcher("/order");
      setOrders(response);
      clearLoading();
      isLoadData = false;
    } catch (error) {
      console.error(error);
      clearLoading();
      isLoadData = false;
    }
  };

  useEffect(() => {
    setOrders(orders);

    const pusher = new Pusher("476d47ea8d47ede8c789", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("order");

    channel.bind("order-finished", async () => {
      await getOrders();
      // setChats((prevState) => [
      //   ...prevState,
      //   { sender: data.sender, message: data.message },
      // ]);
    });

    channel.bind("new-order", async () => {
      await getOrders();
    });

    return () => {
      pusher.unsubscribe("order");
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

      await axios.post("/api/pusher", { id });
      await getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 mb-5 w-full">
      <div className="text-xl font-bold">History page</div>
      <hr className=" my-4" />

      <div className="lg:flex lg:flex-wrap lg:justify-center">
        {orderList.map((order) => {
          return (
            <div key={order.id} className="animate-in fade-in  duration-300">
              <div className="text-xl font-bold">{loading} </div>
              <OrderCard
                order={order}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                onConfirm={onConfirm}
              />
            </div>
          );
        })}
        {loading && <LoadingScreen />}
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
