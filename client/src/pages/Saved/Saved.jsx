import "./Saved.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import { json, useNavigate } from "react-router-dom";
import FullGameReview from "../../components/GameShowcase/FullGameReview/FullGameReview";

function Saved(props) {
  const { currentUser } = useUserStore();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    async function getSavedReivews() {
      const link = "http://localhost:3000/getSavedReviews";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: currentUser }),
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getSavedReivews();
  }, [currentUser]);

  return (
    <div className="savedReviewsContainer">
      <Navigator />
      <div className="savedReviews">
        <h1>Your Saved Reviews.</h1>
        {data.map((review) => {
          return <FullGameReview review={review} key={review.id} from="user" />;
        })}
      </div>
      <TopCurators />
    </div>
  );
}

export default Saved;
