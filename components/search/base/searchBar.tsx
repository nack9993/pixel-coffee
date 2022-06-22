import { useEffect, useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    onSubmit(user);
  }, [user, onSubmit]);
  return (
    <input
      type="text"
      className="border w-full p-3 rounded"
      onChange={({ target }: any) => {
        setUser(target.value);
      }}
    />
  );
};

export default SearchBar;
