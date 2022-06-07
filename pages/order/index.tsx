import Router from "next/router";
import Card from "../../components/card";
import prisma from "../../lib/prisma";

const Order = ({ menu }) => {
  const coffeeTypes = [{ type: "Coffee" }, { type: "Soda" }, { type: "Tea" }];

  const coffees = [
    { name: "Americano", type: "coffee" },
    { name: "Mocca", type: "coffee" },
    { name: "Cappuchino", type: "coffee" },
    { name: "Latte", type: "coffee" },
    { name: "Piccolo Latte", type: "coffee" },
    { name: "Peach Soda", type: "soda" },
    { name: "Thai tea", type: "tea" },
  ];

  const handleClick = (id) => {
    Router.push(`/order/${id}`);
  };

  return (
    <div className="h-screen">
      <div className="pt-4 px-4">
        <div className="text-2xl font-bold text-primary">
          What Would You Like?
        </div>

        <input
          className="mt-5 w-full p-2 border rounded-lg"
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="mt-4">
        <div className="pl-4 overflow-x-scroll">
          <div className="space-x-2 inline-flex">
            {coffeeTypes.map((type) => {
              return (
                <div
                  className="bg-white w-[150px] text-center p-2 rounded-3xl border text-primary"
                  key={type.type}
                >
                  {type.type}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex mt-4 flex-wrap items-center justify-center">
        {menu.map((coffee) => {
          return (
            <div
              className="m-2"
              onClick={() => {
                handleClick(coffee.id);
              }}
            >
              <Card name={coffee.menuName} type={coffee.type}></Card>
            </div>
          );
        })}
      </div>

      <div className="h-14"></div>

      <div className=" fixed bottom-0 w-full h-12 bg-primary">
        <div className="flex p-4 justify-around items-center text-white font-bold">
          <div>Order</div>
          <div>List</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const menu = await prisma.coffee.findMany({});

  return { props: { menu } };
};

export default Order;
