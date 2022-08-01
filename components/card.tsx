const Card = ({ type, name }) => {
  const icon = {
    coffee: { path: "Coffee_cup.svg", width: 60 },
    soda: { path: "Soda.svg", width: 40 },
    tea: { path: "Tea.svg", width: 60 },
  };

  return (
    <div className="min-w-[160px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ">
      <div className="p-2 min-h-[180px] flex flex-col justify-center items-center">
        <img
          alt="icon"
          width={icon[type].width}
          src={`../../${icon[type].path}`}
        />
        <h1 className="font-bold mt-2">{name}</h1>
      </div>
    </div>
  );
};

export default Card;
