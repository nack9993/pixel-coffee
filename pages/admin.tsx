const Admin = () => {
  return (
    <div className=" bg-neutral h-screen p-4">
      <div className="font-bold text-xl">ORDER LIST</div>

      <div className="mt-4">
        <div className="w-[250px] p-1 shadow-lg rounded-md bg-white">
          <div className="p-2">
            <div className="font-bold">Order #1</div>
            <span className=" text-gray">31 June 2021, 07:28 PM</span>

            <div className="mt-6 flex space-x-4">
              <img alt="glass" className="" width={40} src="glass.svg" />

              <div>
                <b>Americano</b>
                <div className="text-xs text-gray"> Hot, Sweet 50%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
