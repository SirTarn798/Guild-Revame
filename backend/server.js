import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv.apply();

const app = express();
const port = 3000;

const url = "https://api.igdb.com/v4/games/";
const coversUrl = "https://api.igdb.com/v4/covers/";


const headers = {
  "Client-ID": "zj32fyz6jbnkptbpl0bwi986nlpfde",
  Authorization: "Bearer " + process.env.VITE_IGDB_BEARER,
  "Content-Type": "application/json",
};

app.listen(port, () => {
  console.log("Server is running on port 3000...");
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/searchGame/:gameName", async (req, res) => {
  const gameName = req.params.gameName;
  const getGamesBody = `fields id, name, rating_count, cover; where name ~ *"Elden Ring"* & category = 0;`;
  try {
    //get game details
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: getGamesBody,
    });
    let gameData = await response.json();

    //sort by popularity
    gameData.sort((a, b) => {
      let aRating_count = a.rating_count !== undefined ? a.rating_count : 0;
      let bRating_count = b.rating_count !== undefined ? b.rating_count : 0;
      return bRating_count - aRating_count;
    });

    //create list of game ids
    let gameIDs = "";
    gameData.forEach((game) => {
      gameIDs += game.id += ",";
    });
    gameIDs = gameIDs.slice(0, -1);

    //get covers
    const getGamesCoverBody = `fields url; where game = (${gameIDs});`;
    response = await fetch(coversUrl, {
      method: "POST",
      headers: headers,
      body: getGamesCoverBody,
    });
    const gameCovers = await response.json();

    //insert image urls to the gameData and change small to huge image
    gameData = gameData.map(game => {
      let matchingObj = gameCovers.find(gameCover => gameCover.id === game.cover);
      if (matchingObj) {
          return { ...game, url: (matchingObj.url.slice(0,-3) + "webp").replace('/t_thumb/', '/t_cover_big/') };
      }
      return game;
  });

    res.json(gameData);
  } catch (err) {
    console.log(err.message);
  }
});
