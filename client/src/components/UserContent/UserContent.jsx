import "./UserContent.css";
import FullGameReview from "../GameShowcase/FullGameReview/FullGameReview";
import { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";

function UserContent(props) {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const { currentUser } = useUserStore();

  useEffect(() => {
    async function retrieveUsersInfo() {
      const linkReview = "http://localhost:3000/getReview";
      const linkUser = "http://localhost:3000/getUser";
      try {
        let response = await fetch(linkReview, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestFromUsername: props.username,
          }),
        });
        let data = await response.json();
        setReviews(data);

        response = await fetch(linkUser, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestFromUsername: props.username,
          }),
        });
        data = await response.json();
        console.log(data);
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    retrieveUsersInfo();
  }, [props.username]);

  return (
    <div className="userContent">
      <img
        src="/nopic.png"
        alt="background image"
        className="backgroundImage"
      />
      <div className="userPageDetail">
        <div className="imgAndTextUser">
          <img src="/user.png" alt="profile picture" />
          <div className="userPageDetailText">
            <h3>Username</h3>
            <p>500 Followers 2 Following</p>
          </div>
        </div>
        <button
          style={{ display: currentUser === user.userid ? "none" : "block" }}
        >
          Follow
        </button>
        <button
          className="editUserButton"
          style={{ display: !(currentUser === user.userid) ? "none" : "block" }}
        >
          Edit User
        </button>
      </div>
      <div className="usersReviewSection">
        <div className="aboveReviewsBar">
          <h2>Username's Reviews</h2>
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
        <div className="usersReviews">
          {reviews.map((review) => {
            return (
              <FullGameReview review={review} key={review.id} from="user" />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserContent;
