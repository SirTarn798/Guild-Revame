import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate()
  const onSearchGame = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { gameName } = Object.fromEntries(formData);
    try {
    navigate(`/searchgame/${gameName}`)
    } catch(err) {
      console.log("Please insert game name.")
    }


  };
  return (
    <form className="searchGame" onSubmit={onSearchGame}>
      <input type="text" name="gameName" placeholder="Search a game..." />
      <button>Search</button>
    </form>
  );
}

export default SearchBar;
