import { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import "./FollowingContent.css";
import FullGameReview from "../GameShowcase/FullGameReview/FullGameReview";

function FollowingContent() {
  const { currentUser } = useUserStore();
  const [followings, setFollowing] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getFollowings = async () => {
      const link = "http://localhost:3000/getFollowing";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: currentUser }),
        });
        const data = await response.json();
        setFollowing(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getFollowings();
  }, [currentUser]);

  useEffect(() => {
    const getReviews = async () => {
      const link = "http://localhost:3000/getFollowReview";
      const userids = followings?.map((user) => `'${user.userid}'`).join(", ");
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userids: userids, userid: currentUser }),
        });
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getReviews();
  }, [followings]);

  return (
    <div className="followingContentContainer">
      <h1>Reviews from accounts you followed</h1>
      {reviews.map((review) => {
        return <FullGameReview review={review} key={review.id} from="user" />;
      })}
    </div>
  );
}

export default FollowingContent;
