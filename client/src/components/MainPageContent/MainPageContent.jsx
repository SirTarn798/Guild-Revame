import "./MainPageContent.css";
import TopGame from "./TopGame/TopGame";
import MiniReview from "../MiniReview/MiniReview";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

function MainPageContent() {

  const [gameFound, setGameFound] = useState("");

  return (
    <div className="mainPageContentContainer">
      <SearchBar searchGame={setGameFound}/>
      <div className="showcaseReview">
        <h1>Top Reviews</h1>
        <div className="reviewRow">
          <MiniReview />
          <MiniReview />
        </div>

        <h1>Recent Reviews</h1>
        <div className="reviewRow">
          <MiniReview />
          <MiniReview />
        </div>
        <h1>Top Game</h1>
        <div className="topGamesContainer">
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
          <TopGame />
        </div>
      </div>
    </div>
  );
}

export default MainPageContent;
