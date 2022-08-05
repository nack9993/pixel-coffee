/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Router from "next/router";
import { useState } from "react";
import BaristaCard from "../../components/baristaCard";
import Card from "../../components/card";
import prisma from "../../lib/prisma";
import coffeeTypes from "../../type/coffeeType.js";

const Order = ({ menu, admin }) => {
  const [menus, setMenus] = useState(menu);
  const [category, setCategory] = useState("");

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
    <div className="relative pb-20">
      <div className=" text-white bg-secondary h-[130px]  px-4 flex justify-center items-center">
        <div className="pt-4 ">
          <div className="text-5xl font-bold text-primary">PIXEL CAFE</div>
        </div>
      </div>

      <div className="mt-[-12px]  px-4">
        <BaristaCard isAvailable={admin.isAvailable} isEditable={false} />
      </div>

      <div className="mt-6">
        <div className="pl-4 overflow-x-scroll">
          <div className="space-x-2 inline-flex">
            {coffeeTypes.map((coffee) => {
              return (
                <div
                  className={`bg-white min-w-[110px] text-center p-1 text-sm rounded-3xl border text-primary cursor-pointer ${
                    category === coffee.type ? "bg-secondary " : ""
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
      <div className="px-4">
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
