import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="flex justify-center w-full h-full">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
