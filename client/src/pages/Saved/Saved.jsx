import "./Saved.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import { json } from "react-router-dom";

function Saved(props) {
  const { currentUser } = useUserStore();
  const [data, setData] = useState();

  useEffect(() => {
    async function getSavedReivews() {
      const link = "http://localhost:3000/getSavedReviews";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({userid: currentUser}),
        });
        const res = await response.json();
        console.log(res);
        setData(res);
      } catch (err) {
        console.log(err.message);
      }
    }
    getSavedReivews();
  }, [currentUser]);

  <div className="savedReviewsContainer">
    <Navigator />
    <div className="savedReviews"></div>
    <TopCurators />
  </div>;
}

export default Saved;
