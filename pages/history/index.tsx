/* eslint-disable react-hooks/exhaustive-deps */
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import LoadingScreen from "../../components/loadingScreen";
import OrderCard from "../../components/orderCard";
import fetcher from "../../lib/fetcher";
import prisma from "../../lib/prisma";

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
    setLoading(true);

    try {
      const response = await fetcher("/order");
      setOrders(response);
      clearLoading();
    } catch (error) {
      console.error(error);
      clearLoading();
    }
  };

  useEffect(() => {
    setOrders(orders);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("order");

    channel.bind("order-finished", async () => {
      await getOrders();
    });

    channel.bind("new-order", async (coffee) => {
      console.log(coffee);
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

  const onCancel = async (id) => {
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
    <div className="w-full relative pb-12">
      <div className="p-4">
        <div className="text-xl font-bold">Order list</div>
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
                  onCancel={onCancel}
                />
              </div>
            );
          })}
        </div>
      </div>
      {loading && <LoadingScreen />}
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
