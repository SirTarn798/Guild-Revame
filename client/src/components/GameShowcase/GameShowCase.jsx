import { useEffect, useState } from "react";
import "./GameShowcase.css";
import useUserStore from "../../../lib/userStore";
import { v4 as uuidv4 } from "uuid";

function GameShowcase(props) {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const { currentUser } = useUserStore();

  const [reviewText, setReviewText] = useState("");

  const postReview = async (e) => {
    e.preventDefault();
    const body = {
      id: uuidv4(),
      gameID: props.gameID,
      reviewerID: currentUser,
      reviewText: reviewText,
      recommend: true,
      dateTime: new Date().toISOString(),
    };

    const link = "http://localhost:3000/postReview";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

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
    async function retrieveReviews() {
      const link = "http://localhost:3000/getReview";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestFromGameID: props.gameID,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    retrieveReviews();
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
          <p>
            {gameData[0].storyline
              ? gameData[0].storyline
              : "The storyline of this game is unavailable."}
          </p>
          <p className="rating">92% of 125 people recommend this game.</p>
        </div>
      </div>
      <div className="aboveReviewsBar">
        <h3>Review</h3>
        <div className="dropdown">
          <div className="dropdownIndicator">
            <p>Sort by</p>
            <button>Recent</button>
          </div>
          <div className="content">
            <a href="">Recent</a>
            <a href="">Popular</a>
          </div>
        </div>
      </div>
      <div className="reviewSection">
        <form className="writeReview" onSubmit={postReview}>
          <textarea
            name="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
          <button>Post review</button>
        </form>
      </div>
    </div>
  );
}

export default GameShowcase;
