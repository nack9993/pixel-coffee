/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const cardMini = ({ selectedCard, item, isSelected }) => {
  const selectCard = (e) => {
    selectedCard(e);
  };
  return (
    <div
      className={`cursor-pointer min-w-[110px]  relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all hover:bg-secondary ${
        isSelected ? "bg-secondary" : ""
      }`}
      onClick={() => {
        selectCard(item);
      }}
    >
      <div className="p-2 min-h-[110px] flex flex-col justify-center items-center">
        <h1 className="font-bold mt-2 text-xl">{item}</h1>
      </div>
    </div>
  );
};

export default cardMini;
