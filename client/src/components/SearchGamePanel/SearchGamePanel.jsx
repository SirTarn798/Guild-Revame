import "./SearchGamePanel.css";
import FoundGame from "./FoundGame/FoundGame";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";

function SearchGamePanel(props) {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function retrieveGameData() {
      const link = "http://localhost:3000/searchGame/" + props.gameName;
      try {
        const response = await fetch(link);
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    retrieveGameData();
  }, [props.gameName]);

  if (isLoading) {
    return (
      <div className="searchGamePanelLoading">
        <div className="loader" style={{ display: "flex" }}></div>
      </div>
    );
  }

  return (
    <div className="searchGamePanel">
      <SearchBar />
      <h1>The Results</h1>
      {gameData.map((game) => {
        return <FoundGame key={game.id} data={game}/>
      })}
    </div>
  );
}

export default SearchGamePanel;
