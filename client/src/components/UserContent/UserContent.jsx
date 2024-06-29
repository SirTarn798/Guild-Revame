import "./UserContent.css";
import FullGameReview from "../GameShowcase/FullGameReview/FullGameReview";
import { useEffect, useState } from "react";

function UserContent(props) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function retrieveReviews() {
      const link = "http://localhost:3000/getReview";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestFromUsername: props.username,
          }),
        });
        const data = await response.json();
        setReviews(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    retrieveReviews();
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
        <button>Follow</button>
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
            return <FullGameReview review={review} key={review.id} from="user"/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default UserContent;
