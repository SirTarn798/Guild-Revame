import "./SearchBar.css";

function SearchBar({ searchGame }) {
  const onSearchGame = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { gameName } = Object.fromEntries(formData);

    const response = await fetch("http://localhost:3000/searchGame/xdd");
    const data = await response.json();
    console.log(data);
  };
  return (
    <form className="searchGame" onSubmit={onSearchGame}>
      <input type="text" name="gameName" placeholder="Search a game..." />
      <button>Search</button>
    </form>
  );
}

export default SearchBar;
