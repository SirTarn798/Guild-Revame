import "./InteractionTab.css";
import useUserStore from "../../../lib/userStore";
import { useState } from "react";

function InteractionTab(props) {
  const { currentUser } = useUserStore();
  const [hasLiked, setHasLiked] = useState(props.hasliked);
  const [hasSaved, setHasSaved] = useState(props.hassaved);
  const [like, setLike] = useState(props.like);

  const copyToClipBoard = (e) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(`http://localhost:5173/review/${props.reviewid}`)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleLike = async () => {
    let body;
    if (!hasLiked) {
      body = { action: "like" };
    } else {
      body = { action: "unlike" };
    }
    const link = "http://localhost:3000/handleLike";
    body.userid = currentUser;
    body.reviewid = props.reviewid;
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
      });
      const data = await response.text();
      if (data === "liked") {
        setHasLiked(true);
        setLike(like + 1);
      } else if (data === "unliked") {
        setHasLiked(false);
        setLike(like - 1);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSave = async () => {
    let body;
    if (!hasSaved) {
      body = { action: "saved" };
    } else {
      body = { action: "unsaved" };
    }
    const link = "http://localhost:3000/handleSaveReview";
    body.userid = currentUser;
    body.reviewid = props.reviewid;
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
      });
      const data = await response.text();
      console.log(data);
      if (data === "saved") {
        setHasSaved(true);
      } else if (data === "unsaved") {
        setHasSaved(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="interactionTabContainer">
      <div
        className={
          "interaction " +
          (hasLiked ? "hasLikedInteraction" : "hasntLikedInteraction")
        }
        onClick={handleLike}
      >
        <img src="/like.png" />
        <p>{`Like ${like}`}</p>
      </div>
      <div className="interaction shareInteraction">
        <img src="/share.png" />
        <p onClick={copyToClipBoard}>Share</p>
      </div>
      <div
        className={
          "interaction " +
          (hasSaved ? "hasSavedInteraction" : "hasntSavedInteraction")
        }
        onClick={handleSave}
      >
        <img src="/saved.png" />
        <p>Save</p>
      </div>
    </div>
  );
}

export default InteractionTab;
