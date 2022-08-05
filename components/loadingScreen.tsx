const LoadingScreen = () => {
  return (
    <div className="min-h-screen h-full w-full bg-primary/50 absolute flex justify-center items-center top-0">
      <div className="animate-bounce delay-150 duration-500 text-4xl text-white">
        Loading
      </div>
    </div>
  );
};
export default LoadingScreen;
