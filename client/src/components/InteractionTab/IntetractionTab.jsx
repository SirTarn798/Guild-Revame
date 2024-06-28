import "./InteractionTab.css";
import useUserStore from "../../../lib/userStore";
import { useState } from "react";

function InteractionTab(props) {
  const { currentUser } = useUserStore();
  const [hasLiked, setHasLiked] = useState(props.hasliked);
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
        <p>share</p>
      </div>
    </div>
  );
}

export default InteractionTab;
