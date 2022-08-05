/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const cardMini = (props) => {
  const { selectedCard, item, isSelected } = props;
  return (
    <div
      className={`cursor-pointer min-w-[90px] w-full relative bg-white  border rounded-xl shadow-[0px_10px_rgb(0,0,0)] transition-all ${
        isSelected && "bg-secondary"
      }`}
      onClick={() => {
        selectedCard(item);
      }}
    >
      <div className="p-2 min-h-[90px] flex flex-col justify-center items-center">
        <h1 className="font-bold mt-2 text-xl">{item}</h1>
      </div>
    </div>
  );
};

export default cardMini;
