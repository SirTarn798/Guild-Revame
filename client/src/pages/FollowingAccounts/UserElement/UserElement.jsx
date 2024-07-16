import { useState } from "react";
import "./UserElement.css";
import useUserStore from "../../../../lib/userStore";
import { useNavigate } from "react-router-dom";

function UserElement(props) {
  const [follow, setFollow] = useState(true);
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const handleClickUser = () => {
    navigate(`/user/${props.username}`)
  }

  const handleFollow = async () => {
    const link = "http://localhost:3000/follow";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerID: currentUser,
          followingID: props.userid,
          follow: follow,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }

    setFollow(!follow);
  };

  return (
    <div className="userElementContainer">
      <div className="userElementUserSection">
        <img src={props.pfp} alt="profile picture" />
        <h2 onClick={handleClickUser}>{props.username}</h2>
      </div>
      <button onClick={handleFollow}>{follow ? "Unfollow" : "Follow"}</button>
    </div>
  );
}

export default UserElement;
