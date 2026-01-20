import { useState } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);

  function handleChange(e) {
    setInput(e.target.value);
  }
  function handleSearch() {
    if (input != "") {
      setInputError(false);
      onSearch(input.trim());
    } else {
      setInputError(true);
    }
  }

  return (
    <>
      <input type="text" onChange={handleChange} value={input} />
      <button onClick={handleSearch}>Search</button>
      {inputError && <p>Please input move name</p>}
    </>
  );
}
export default SearchBar;
