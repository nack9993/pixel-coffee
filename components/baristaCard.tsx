const BaristaCard = (props) => {
  const { isAvailable, updateStatus, isEditable } = props;
  return (
    <div
      className={`${
        isAvailable ? "bg-success" : "bg-primary"
      } border shadow-[0px_10px_rgb(0,0,0)] h-[90px] p-4 rounded-xl`}
    >
      <div className="flex justify-between text-white ">
        <div>
          Barista status
          <div className="text-xl font-bold flex mt-4">
            {isEditable && (
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
            )}

            {isAvailable ? "Available" : "Not available"}
          </div>
        </div>
        <img alt="icon" width="45" src="../Coffee_cup.svg" />
      </div>
    </div>
  );
};

export default BaristaCard;
