import Card from "../../components/card";
import prisma from "../../lib/prisma";

const OrderProcess = ({ menu }) => {
  console.log(menu);
  const icon = {
    coffee: { path: "../Coffee_cup.svg" },
    soda: { path: "../Soda.svg" },
    tea: { path: "../Tea.svg" },
  };

  return (
    <div className=" h-screen bg-secondary ">
      <div className="h-1/2 flex justify-center items-center">
        <img className="w-[35%] max-w-[150px]" src={icon[menu.type].path} />
      </div>

      <div className="w-full h-1/2 bg-white">
        <div className="p-4">
          <div className="text-4xl font-bold">{menu.menuName}</div>

          <div className="flex mt-4  justify-between">
            <div className="min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
              <div className="p-2 min-h-[80px] flex flex-col justify-center items-center">
                <h1 className="font-bold mt-2 text-xl">0%</h1>
              </div>
            </div>

            <div className="min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
              <div className="p-2 min-h-[80px] flex flex-col justify-center items-center">
                <h1 className="font-bold mt-2 text-xl">25%</h1>
              </div>
            </div>

            <div className="min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
              <div className="p-2 min-h-[80px] flex flex-col justify-center items-center">
                <h1 className="font-bold mt-2 text-xl">50%</h1>
              </div>
            </div>

            <div className="min-w-[90px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
              <div className="p-2 min-h-[80px] flex flex-col justify-center items-center">
                <h1 className="font-bold mt-2 text-xl">100%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  console.log(query);
  console.log(req);
  const menu = await prisma.coffee.findUnique({ where: { id: +query.id } });

  return { props: { menu } };
};

export default OrderProcess;
