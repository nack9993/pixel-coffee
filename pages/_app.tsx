import { StoreProvider } from "easy-peasy";
import Link from "next/link";
import { useRouter } from "next/router";
import store from "../lib/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const isShowMenu = () => {
    const path = ["/", "/order/[id]"];

    return path.includes(router.route);
  };

  return (
    <StoreProvider store={store}>
      <div className="flex justify-center items-center h-full relative flex-col bg-primary ">
        <div className="w-[390px] bg-white h-full ">
          <Component {...pageProps} />
          {!isShowMenu() && (
            <div className="fixed bottom-0 bg-primary text-white p-4 flex justify-around w-[390px]">
              <Link href="/order">Order</Link>
              <Link href="/history">History</Link>
            </div>
          )}
        </div>
      </div>
    </StoreProvider>
  );
};

export default MyApp;
