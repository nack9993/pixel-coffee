import Image from "next/image";

const OrderCard = ({ order, selectedId, setSelectedId, onConfirm }) => {
  const icon = {
    coffee: { path: "/../Coffee_cup.svg" },
    soda: { path: "/../Soda.svg" },
    tea: { path: "/../Tea.svg" },
  };

  return (
    <div key={order.id} className="animate-in slide-in-from-left-75  lg:m-4">
      <div
        role="menuitem"
        className={`p-4 mb-5 rounded-lg border border-gray  shadow-[0px_10px_rgb(0,0,0)] ${
          order.id === selectedId ? "border-primary" : ""
        }`}
        onClick={() => {
          setSelectedId(order.id);
        }}
        tabIndex={0}
        aria-hidden="true"
      >
        <div className="flex justify-between">
          <div className="mb-2">
            <span className="font-bold text-xl mb-2">Order #{order.id}</span>
            {/* {JSON.stringify(order)}
            {order.new && (
              <span className="ml-2 p-1 rounded-lg text-xs bg-success text-white font-bold">
                New
              </span>
            )} */}
          </div>
          {/* <Image
          alt=""
          className="rounded-full"
          src={order.User.avatar}
          width={50}
          height={50}
        /> */}
          <div className="rounded-md bg-primary text-white h-[25px] px-2 text-sm">
            {order.orderBy}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex w-full">
            <Image src={icon[order.Coffee.type].path} width={80} height={80} />
            <div className="ml-4 w-full">
              <div className="font-bold text-md">{order.Coffee.menuName} </div>
              <div className="text-sm">Hot, Sweet {order.sweet}%</div>

              <div className="mt-4 flex justify-between w-full">
                <button
                  type="button"
                  className="py-2 px-7 text-gray rounded-xl text-sm "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-2 px-10 bg-secondary rounded-xl text-sm border border-primary"
                  onClick={() => {
                    onConfirm(order.id);
                  }}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
