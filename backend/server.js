import express, { query, response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import pg from "pg";
import bodyParser from "body-parser";

configDotenv.apply();

//Connect databse
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Guild Revame",
  password: process.env.DB_PASSWORD,
  port: 5432,
});
db.connect();

//Initialize server
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000...");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Setup CORS
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//IGDB API setup
const url = "https://api.igdb.com/v4/games/";
const coversUrl = "https://api.igdb.com/v4/covers/";

//IGDB Header
const headers = {
  "Client-ID": "zj32fyz6jbnkptbpl0bwi986nlpfde",
  Authorization: "Bearer " + process.env.VITE_IGDB_BEARER,
  "Content-Type": "application/json",
};

app.get("/searchGameName/:gameName", async (req, res) => {
  const gameName = req.params.gameName;
  const getGamesBody = `fields id, name, rating_count, storyline, cover; where name ~ *"${gameName}"* & category = 0;`;
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
    gameData = gameData.map((game) => {
      let matchingObj = gameCovers.find(
        (gameCover) => gameCover.id === game.cover
      );
      if (matchingObj) {
        return {
          ...game,
          url: (matchingObj.url.slice(0, -3) + "webp").replace(
            "/t_thumb/",
            "/t_cover_big/"
          ),
        };
      }
      return game;
    });
    res.json(gameData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/searchGameID/:gameID", async (req, res) => {
  const gameID = req.params.gameID;
  const getGamesBody = `fields id, name, storyline, cover; where id = ${gameID};`;
  try {
    //get game detail
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: getGamesBody,
    });
    let gameData = await response.json();

    //get cover
    const getGamesCoverBody = `fields url; where game = (${gameID});`;
    response = await fetch(coversUrl, {
      method: "POST",
      headers: headers,
      body: getGamesCoverBody,
    });
    const gameCovers = await response.json();

    //insert image url to the gameData and change small to huge image
    gameData = gameData.map((game) => {
      let matchingObj = gameCovers.find(
        (gameCover) => gameCover.id === game.cover
      );
      if (matchingObj) {
        return {
          ...game,
          url: (matchingObj.url.slice(0, -3) + "webp").replace(
            "/t_thumb/",
            "/t_cover_big/"
          ),
        };
      }
      return game;
    });

    res.json(gameData);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/getReview", async (req, res) => {
  if (req.body.requestFromGameID) {
    let data;
    const gameID = req.body.requestFromGameID;
    const query = `
    SELECT reviews.*, users.*,
           EXISTS (
               SELECT 1
               FROM likes
               WHERE likes.userid = users.userid
               AND likes.reviewid = reviews.reviewid
           ) AS hasLiked
    FROM reviews
    JOIN users ON users.userid = reviews.reviewerid
    WHERE reviews.gameid = '${gameID}';
    `;
    try {
      const response = await db.query(query);
      data = response.rows;
    } catch (err) {
      console.log(err.message);
    }
    res.json(data);
  } else if (req.body.requestFromUsername) {
    let data;
    const username = req.body.requestFromUsername;
    const query = `
    SELECT reviews.*, users.*,
           EXISTS (
               SELECT 1
               FROM likes
               WHERE likes.userid = users.userid
               AND likes.reviewid = reviews.reviewid
           ) AS hasLiked,
          EXISTS (
              SELECT 1 
              FROM saved 
              WHERE saved.userid = users.userid 
              AND saved.reviewid = reviews.reviewid
           ) AS hasSaved
    FROM reviews
    JOIN users ON users.userid = reviews.reviewerid
    WHERE users.username = '${username}';
    `;
    try {
      const response = await db.query(query);
      data = response.rows;
    } catch (err) {
      console.log(err.message);
    }
    res.json(data);
  }
});

app.post("/postReview", async (req, res) => {
  const data = req.body;
  const query = `
    INSERT INTO reviews (reviewid, gameID, reviewerID, reviewText, recommend, datetime, "like", gamename)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const review = [
    data.id,
    data.gameID,
    data.reviewerID,
    data.reviewText,
    data.recommend,
    data.dateTime,
    data.like,
    data.gamename,
  ];
  try {
    await db.query(query, review);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/addUser", async (req, res) => {
  const data = req.body;
  const query = `
  INSERT INTO users (userid, username, pfp)
  VALUES ($1, $2, $3)
  `;

  const user = [data.id, data.username, data.pfp];
  try {
    await db.query(query, user);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/handleLike", async (req, res) => {
  let query = "";
  let msg;
  const data = req.body.body;
  if (data.action === "like") {
    query = `INSERT INTO "likes" VALUES ('${data.userid}', '${data.reviewid}');
    UPDATE reviews SET "like" = "like" + 1 WHERE reviewid = '${data.reviewid}';
    `;
    msg = "liked";
  } else if (data.action === "unlike") {
    query = `DELETE FROM likes WHERE userid = '${data.userid}' AND reviewid = '${data.reviewid}';
    UPDATE reviews SET "like" = "like" - 1 WHERE reviewid = '${data.reviewid}';
    `;
    msg = "unliked";
  }
  try {
    const response = await db.query(query);
  } catch (err) {
    console.log(err.message);
  }
  res.send(msg);
});

app.post("/getUser", async (req, res) => {
  if (req.body.requestFromUsername) {
    const username = req.body.requestFromUsername;
    let user;
    const query = `select * from users where username = '${username}'`;
    try {
      const response = await db.query(query);
      user = response.rows;
    } catch (err) {
      console.log(err.message);
    }
    res.json(user);
  }
});

app.post("/handleSaveReview", async (req, res) => {
  const data = req.body.body;
  let msg;
  let query;
  if (data.action === "saved") {
    query = `INSERT INTO "saved" VALUES ('${data.userid}', '${data.reviewid}');`;
    msg = "saved";
  } else if (data.action === "unsaved") {
    query = `DELETE FROM "saved" WHERE userid = '${data.userid}' AND reviewid = '${data.reviewid}';`;
    msg = "unsaved";
  }
  try {
    const response = await db.query(query);
  } catch (err) {
    console.log(err);
  }
  res.send(msg);
});
