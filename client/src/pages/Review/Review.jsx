import "./Review.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import { useEffect, useState } from "react";
import FullGameReview from "../../components/GameShowcase/FullGameReview/FullGameReview";
import { useParams } from "react-router-dom";
import useUserStore from "../../../lib/userStore";

function Review() {
  const {currentUser} = useUserStore();
  const [review, setReview] = useState([]);
  const params = useParams();
  const reviewID = params.reviewID;

  useEffect(() => {
    const getReview = async () => {
      const link = "http://localhost:3000/getReviewFromID";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewID: reviewID, userid : currentUser }),
        });
        const data = await response.json();
        setReview(data[0]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getReview();
  }, [reviewID]);

  return (
    <div className="reviewContainer">
      <Navigator />
      <div className="reviewSection">
        <FullGameReview review={review} key={review.reviewid} from="user" />
      </div>
      <TopCurators />
    </div>
  );
}

export default Review;
