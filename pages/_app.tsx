import { StoreProvider } from "easy-peasy";
import Link from "next/link";
import { useRouter } from "next/router";
import store from "../lib/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const isShowMenu = () => {
    const path = ["/", "/order/[id]"];

    console.log(path.includes(router.route));
  };

  isShowMenu();
  return (
    <StoreProvider store={store}>
      <div className="flex justify-center w-full h-full relative flex-col">
        <Component {...pageProps} />

        {!isShowMenu && (
          <div className="fixed bottom-0 bg-primary text-white w-full p-4 flex justify-around">
            <Link href="/order">Order</Link>
            <Link href="/history">History</Link>
          </div>
        )}
      </div>
    </StoreProvider>
  );
};

export default MyApp;
