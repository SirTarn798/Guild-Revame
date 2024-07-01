import "./InteractionTab.css";
import useUserStore from "../../../lib/userStore";
import { useState } from "react";

function InteractionTab(props) {
  const { currentUser } = useUserStore();
  const [hasLiked, setHasLiked] = useState(props.hasliked);
  const [hasSaved, setHasSaved] = useState(props.hasSaved);

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
    if(data === "liked") {
      setHasLiked(true);
    }
    else if(data === "unliked") {
      setHasLiked(false)
    }
  } catch(err) {
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
    const link = "http://localhost:3000/handleSaveReview"
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
    if(data === "saved") {
      setHasSaved(true);
    }
    else if(data === "unsaved") {
      setHasSaved(false)
    }
  } catch(err) {
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
        <p>Like</p>
      </div>
      <div className="interaction shareInteraction">
        <img src="/share.png" />
        <p>Share</p>
      </div>
      <div className={
          "interaction " +
          (hasSaved ? "hasSavedInteraction" : "hasntSavedInteraction")
        } onClick={handleSave}>
        <img src="/saved.png" />
        <p>Save</p>
      </div>
    </div>
  );
}

export default InteractionTab;
