/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Router from "next/router";
import { useState } from "react";
import Card from "../../components/card";
import prisma from "../../lib/prisma";
import coffeeTypes from "../../type/coffeeType.js";

const Order = ({ menu, admin }) => {
  const [menus, setMenus] = useState(menu);
  const [category, setCategory] = useState("");

  console.log(admin);

  const handleClick = (id) => {
    Router.push(`/order/${id}`);
  };

  const searchMenu = (e) => {
    const name = String(e.target.value).toLocaleLowerCase();

    const filterdMenu = menu.filter(({ menuName }) => {
      const lowerCase = String(menuName).toLocaleLowerCase();
      return lowerCase.match(name);
    });
    setMenus(filterdMenu);
  };

  const fitlerCategory = (type) => {
    if (type !== category) {
      setCategory(type);
    } else {
      setCategory("");
      setMenus(menu);
      return;
    }

    const name = String(type).toLocaleLowerCase();

    const filterdMenu = menu.filter((menuType) => {
      const lowerCase = String(menuType.type).toLocaleLowerCase();
      return lowerCase.match(name);
    });
    setMenus(filterdMenu);
  };

  return (
    <div className="relative mb-[80px]">
      <div className=" text-white bg-secondary h-[130px]  px-4 flex justify-center items-center">
        <div className="pt-4 ">
          <div className="text-5xl font-bold text-primary">PIXEL CAFE</div>
        </div>
      </div>

      <div className="mt-[-12px] px-4">
        {admin.isAvailable ? (
          <div className=" bg-success border shadow-[0px_10px_rgb(0,0,0)] h-[90px] p-4 rounded-xl">
            <div className="flex justify-between text-white ">
              <div>
                Barista status
                <div className="text-xl font-bold">Available</div>
              </div>
              <img alt="icon" width="45" src="../Coffee_cup.svg" />
            </div>
          </div>
        ) : (
          <div>
            <div className=" bg-primary border shadow-[0px_10px_rgb(0,0,0)] h-[90px] p-4 rounded-xl">
              <div className="flex justify-between text-white ">
                <div>
                  Barista status
                  <div className="text-xl font-bold">Not available</div>
                </div>
                <img alt="icon" width="45" src="../Coffee_cup.svg" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="pt-2 px-4">
        {/* <div className="bg-primary text-white rounded-lg">
          <div className="p-2">
            Your order is
            <img alt="icon" width="60" src="../Coffee_cup.svg" />
          </div>
        </div> */}

        <input
          className="mt-5 w-full p-2 border rounded-lg"
          type="text"
          placeholder="Search..."
          onInput={searchMenu}
        />
      </div>

      <div className="mt-4">
        <div className="pl-4 overflow-x-scroll">
          <div className="space-x-2 inline-flex">
            {coffeeTypes.map((coffee) => {
              return (
                <div
                  className={`bg-white w-[150px] text-center p-2 rounded-3xl border text-primary cursor-pointer ${
                    category === coffee.type ? "bg-secondary font-bold" : ""
                  }`}
                  key={coffee.type}
                  onClick={() => fitlerCategory(coffee.type)}
                >
                  {coffee.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex mt-4 flex-wrap items-center mx-4 ">
        {menus.map((coffee) => {
          return (
            <div
              key={coffee.id}
              tabIndex={0}
              role="menuitem"
              className="m-2 cursor-pointer"
              onClick={() => {
                handleClick(coffee.id);
              }}
            >
              <Card name={coffee.menuName} type={coffee.type} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const menu = await prisma.coffee.findMany({});
  const admin = await prisma.admin.findUnique({ where: { id: 1 } });

  return { props: { menu, admin } };
};

export default Order;
