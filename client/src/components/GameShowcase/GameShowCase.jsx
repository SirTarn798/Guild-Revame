import { useEffect, useState } from "react";
import "./GameShowcase.css";

function GameShowcase(props) {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function retrieveGameData() {
      const link = "http://localhost:3000/searchGameID/" + props.gameID;
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
  }, [props.gameID]);

  if (isLoading) {
    return (
      <div className="searchGamePanelLoading">
        <div className="loader" style={{ display: "flex" }}></div>
      </div>
    );
  }
  return (
    <div className="gameShowcaseContainer">
      <h1>{gameData[0].name}</h1>
      <div className="fullGameDetail">
        <img src={gameData[0].url ? gameData[0].url : "/nopic.png"} alt="" />
        <div className="storylineAndRating">
          <p>{gameData[0].storyline ? gameData[0].storyline : "The storyline of this game is unavailable."}</p>
          <p className="rating">92% of 125 people recommend this game.</p>
        </div>
      </div>
      <div className="aboveReviewsBar">
        <h3>Review</h3>
        <div class="dropdown">
          <div className="dropdownIndicator">
            <p>Sort by</p>
            <button>Recent</button>
          </div>
          <div class="content">
            <a href="">Recent</a>
            <a href="">Popular</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameShowcase;
