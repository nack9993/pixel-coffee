import Router from "next/router";

const Home = () => {
  const handleClick = (e) => {
    e.preventDefault();
    Router.push("/order");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral flex-col">
      <div className="animate-bounce   duration-1000">
        <img className="p-10" width={300} src="Coffee_cup.svg" alt="" />
      </div>
      <div className="text-5xl font-bold text-secondary">PIXEL CAFE</div>

      <div className="mt-10">
        <button
          type="button"
          className="p-4 px-24 bg-secondary  rounded-md text-white font-bold shadow-[0px_10px_rgb(0,0,0)] border border-primary"
          onClick={handleClick}
        >
          {`Let's order`}
        </button>
      </div>
    </div>
  );
};
export default Home;
