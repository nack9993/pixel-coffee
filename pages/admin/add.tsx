/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import CardMini from "../../components/cardMini";
import coffeeTypes from "../../type/coffeeType.js";

const AddMenu = () => {
  const [type, setType] = useState({
    width: 60,
    path: "/Coffee_cup.svg",
    type: "coffee",
  });
  const [menuName, setMenuName] = useState("");
  const addNewMenu = async () => {
    try {
      await axios.post("/api/coffee/new", {
        menuName,
        type: type.type,
      });

      Router.push(`/order`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-white h-screen relative">
      <div className="flex justify-center items-center min-h-[280px] flex-col bg-secondary p-4">
        <img
          alt="coffee"
          className={`w-[30%] max-w-[${type.width}]`}
          src={type.path}
        />
      </div>

      <div className="p-4">
        <div className="text-xl font-bold mb-2">Name: {menuName}</div>
        <input
          type="text"
          className="border w-full p-3 rounded"
          onChange={({ target }: any) => {
            setMenuName(target.value);
          }}
        />

        <section className="mt-4">
          <div className="text-xl font-bold mb-2">Type</div>
          <div className="flex justify-between">
            {coffeeTypes.map((coffee) => (
              <CardMini
                isSelected={type.type === coffee.type}
                selectedCard={() => {
                  setType(coffee);
                }}
                item={coffee.name}
              />
            ))}
          </div>
        </section>
      </div>

      <div className=" absolute bottom-10 w-full flex justify-center">
        <div
          className="p-4 border w-[260px] text-center rounded-lg bg-secondary  text-primary shadow-[0px_10px_rgb(0,0,0)] cursor-pointer"
          onClick={() => addNewMenu()}
        >
          Add menu
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
