import Image from "next/image";

const OrderCard = ({
  order,
  selectedId,
  setSelectedId,
  onConfirm,
  onCancel,
}) => {
  const icon = {
    coffee: { path: "/../Coffee_cup.svg" },
    soda: { path: "/../Soda.svg" },
    tea: { path: "/../Tea.svg" },
  };

  return (
    <div key={order.id} className="animate-in slide-in-from-left-75  lg:m-4 ">
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
          <div>
            <div className="rounded-md bg-primary text-white p-1  text-sm">
              {order.orderBy}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex w-full items-start">
            <Image src={icon[order.Coffee.type].path} width={90} height={90} />
            <div className="ml-4 w-full">
              <div className="font-bold">
                {order.type && (
                  <span
                    className={`mr-1 ${
                      order.type === "Hot" ? "text-error" : "text-info"
                    } text-sm`}
                  >
                    ({order.type})
                  </span>
                )}

                <span className="font-bold text-xd">
                  {" "}
                  {order.Coffee.menuName}{" "}
                </span>
              </div>
              <div className="text-sm">Sweet {order.sweet}%</div>

              {order.description && (
                <div className="text-sm text-gray break-words max-w-[250px]">
                  <span className="text-xs">Note:</span> {order.description}
                </div>
              )}

              <div className="mt-4 flex justify-between w-full">
                <button
                  type="button"
                  className="py-1 px-7 text-gray rounded-xl text-xs"
                  onClick={() => {
                    onCancel(order.id);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-1 px-10 bg-secondary rounded-xl text-sm border border-primary"
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
