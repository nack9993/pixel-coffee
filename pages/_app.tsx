/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { StoreProvider } from "easy-peasy";
import Link from "next/link";
import { useRouter } from "next/router";
import "../styles/globals.css";
// import * as PusherPushNotifications from "@pusher/push-notifications-web";
// import { useEffect } from "react";
import store from "../lib/store";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const isShowMenu = () => {
    const path = ["/", "/order/[id]", "/admin/add"];

    return path.includes(router.route);
  };

  const menuRoutes = [
    { name: "Home", icon: "/Home.svg", link: "/order" },
    { name: "History", icon: "/History.svg", link: "/history" },
  ];

  if (typeof Notification !== "undefined") {
    Notification.requestPermission();
  }

  // const checkMe = () => {
  //   window.navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
  //     const beamsClient = new PusherPushNotifications.Client({
  //       instanceId: "fe2304a2-0664-499f-87a0-f33aa193e9d1",
  //       serviceWorkerRegistration,
  //     });

  //     beamsClient
  //       .start()
  //       .then((beamsClients: any) => beamsClients.getDeviceId())
  //       .then((deviceId) =>
  //         console.log(
  //           "Successfully registered with Beams. Device ID:",
  //           deviceId
  //         )
  //       )
  //       .then(() => beamsClient.addDeviceInterest("hello"))
  //       .then(() => beamsClient.getDeviceInterests())
  //       .then((interests) => console.log("Current interests:", interests))
  //       .catch(console.error);
  //   });
  // };

  // useEffect(() => {
  //   checkMe();
  // });

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" /> <title>PIXEL CAFE</title>
      </Head>
      <StoreProvider store={store}>
        <div className="flex justify-center items-center relative flex-col bg-primary ">
          <div className="w-[390px] bg-white min-h-screen overflow-auto h-full ">
            <Component {...pageProps} />
          </div>
          {!isShowMenu() && (
            <div className="fixed bottom-0 p-4 w-[390px] ">
              <div className=" flex justify-around p-1 bg-success rounded-lg border shadow-[0px_10px_rgb(0,0,0)]">
                {menuRoutes.map((route) => {
                  return (
                    <Link href={route.link} key={route.link}>
                      <div
                        className={`p-2 rounded-sm cursor-pointer flex ${
                          router.route === route.link
                            ? "bg-secondary border rounded-lg"
                            : ""
                        }`}
                      >
                        <img
                          alt="icon"
                          className="mr-2"
                          src={route.icon}
                          width={15}
                          height={15}
                        />
                        {route.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </StoreProvider>
    </>
  );
};

export default MyApp;
