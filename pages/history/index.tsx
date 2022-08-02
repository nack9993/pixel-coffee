/* eslint-disable no-unused-vars */
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

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("order");

    channel.bind("order-finished", async ({ id }) => {
      // Check the order id
      const orderId = window.localStorage.getItem("orderId");

      if (orderId && +orderId === id) {
        const title = `Order #${id} is finished`;
        const body =
          "Your order is already finished. Please check on the kitchen";

        if (typeof Notification === "undefined") return;
        const notification = new Notification(title, { body });

        window.localStorage.setItem("orderId", "");
      }

      await getOrders();
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
      await axios.post(
        "https://hooks.slack.com/services/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",
        { type: "section", text: { type: "mrkdwn", text: "Test kurb eiei" } }
      );
      await getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-5 w-full relative">
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
