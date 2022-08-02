/* eslint-disable jsx-a11y/no-static-element-interactions */

import Link from "next/link";
import { useState } from "react";
import BaristaCard from "../../components/baristaCard";
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
          <BaristaCard
            isAvailable={isAvailable}
            isEditable
            updateStatus={updateStatus}
          />
        </div>

        <div className="mt-4">
          <Link href="/admin/add">
            <div className="p-4 border w-full text-center rounded-lg bg-secondary  shadow-[0px_10px_rgb(0,0,0)] cursor-pointer ">
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
