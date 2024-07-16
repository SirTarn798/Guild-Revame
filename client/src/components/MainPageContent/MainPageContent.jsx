import "./MainPageContent.css";
import TopGame from "./TopGame/TopGame";
import MiniReview from "../MiniReview/MiniReview";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";

function MainPageContent() {
  const [topGames, setTopGames] = useState();
  const [games, setGames] = useState([]);
  const [topReviews, setTopReviews] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);

  const getTopGames = async () => {
    const link = "http://localhost:3000/getTopGames";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTopGames(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTopReviews = async () => {
    const link = "http://localhost:3000/getTopReviews";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setTopReviews(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getRecentReviews = async () => {
    const link = "http://localhost:3000/getRecentReviews";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRecentReviews(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTopGames();
    getTopReviews();
    getRecentReviews();
  }, []);

  useEffect(() => {
    const getGames = async () => {
      const link = "http://localhost:3000/getGames";
      const gameids = `(${topGames
        .map((game) => `${parseInt(game.gameid)}`)
        .join(", ")})`;
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameids: gameids }),
        });
        const data = await response.json();

        //add popularity to gameData
        const gameData = data.map((item1) => {
          const item2 = topGames.find(
            (item2) => item2.gameid === `${item1.id}`
          );
          return {
            ...item1,
            ...(item2 || {}),
          };
        });

        //sort by popularity
        gameData.sort((a, b) => {
          return parseInt(b.popularity) - parseInt(a.popularity);
        });
        setGames(gameData);
      } catch (err) {
        console.log(err.message);
      }
    };
    getGames();
  }, [topGames]);

  return (
    <div className="mainPageContentContainer">
      <SearchBar />
      <div className="showcaseReview">
        <h1>Top Reviews</h1>
        <div className="reviewRow">
          {topReviews?.map((review) => {return(<MiniReview username={review.username} pfp={review.pfp} reviewtext={review.reviewtext} gamename={review.gamename} reviewid={review.reviewid} key={review.reviewid}/>)})}
        </div>

        <h1>Recent Reviews</h1>
        <div className="reviewRow">
        {recentReviews?.map((review) => {return(<MiniReview username={review.username} pfp={review.pfp} reviewtext={review.reviewtext} gamename={review.gamename} reviewid={review.reviewid} key={review.reviewid}/>)})}

        </div>
        <h1>Top Game</h1>
        <div className="topGamesContainer">
          {games?.map((game) => {
            return (
              <TopGame
                name={game.name}
                url={game.url}
                id={game.id}
                key={game.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPageContent;
