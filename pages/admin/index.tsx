/* eslint-disable jsx-a11y/no-static-element-interactions */

import Link from "next/link";
import { useState } from "react";
import fetcher from "../../lib/fetcher";
import prisma from "../../lib/prisma";

/* eslint-disable jsx-a11y/click-events-have-key-events */
const Admin = ({ admin }) => {
  const [isAvailable, setIsAvailable] = useState(admin.isAvailable);
  const updateStatus = async (value: boolean) => {
    setIsAvailable(value);
    await fetcher("/admin/set", { isAvailable: value });
  };

  return (
    <div className=" bg-white h-screen ">
      <div className=" text-white bg-secondary h-[130px]  px-4 flex justify-center items-center">
        <div className="pt-4 ">
          <div className="text-5xl font-bold text-primary">PIXEL CAFE</div>
        </div>
      </div>

      <div className="px-4">
        <div className="mt-[-12px]">
          <div
            className={`${
              isAvailable ? "bg-success" : "bg-primary"
            } border shadow-[0px_10px_rgb(0,0,0)] h-[90px] p-4 rounded-xl`}
          >
            <div className="flex justify-between text-white ">
              <div>
                Barista status
                <div className="text-xl font-bold flex mt-4">
                  <label
                    htmlFor="default-toggle"
                    className="inline-flex relative items-center cursor-pointer mr-2"
                  >
                    <input
                      defaultChecked={isAvailable}
                      type="checkbox"
                      value={isAvailable}
                      id="default-toggle"
                      className="sr-only peer"
                      onChange={({ target }) => updateStatus(target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-secondary" />
                  </label>

                  {isAvailable ? "Available" : "Not available"}
                </div>
              </div>
              <img alt="icon" width="45" src="../Coffee_cup.svg" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/admin/add">
            <div className="p-4 border w-full text-center rounded-lg bg-primary text-white ">
              Add menu
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const admin = await prisma.admin.findUnique({ where: { id: 1 } });

  return { props: { admin } };
};

export default Admin;
