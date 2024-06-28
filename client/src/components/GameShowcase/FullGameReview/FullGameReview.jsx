import "./FullGameReview.css";
import { useNavigate } from "react-router-dom"
import InteractionTab from "../../InteractionTab/IntetractionTab";

function FullGameReview(props) {

    const navigate = useNavigate();
    const clickUserDetailHandle = () => {
        navigate("/");
    }
  return (
    <div className="fullGameReview">
      <div className="topReview">
        <div className="userDetail">
          <img src={props.review.pfp} alt="profile" />
          <p onClick={clickUserDetailHandle}>{props.review.username}</p>
        </div>
        <div className="recommendation">
          <img src={props.review.recommend ? "/recommend.png" : "/notRecommend.png"} alt={props.review.recommend ? "recommend" : "notRecommend"} />
          <p>recommend</p>
        </div>
      </div>
      <p>{props.review.reviewtext}</p>
      <InteractionTab reviewid={props.review.reviewid} userid={props.review.userid} hasliked={props.review.hasliked}/>
    </div>
  );
}

export default FullGameReview;
