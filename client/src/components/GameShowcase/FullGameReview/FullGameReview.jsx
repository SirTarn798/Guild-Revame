import "./FullGameReview.css";
import { useNavigate } from "react-router-dom";
import InteractionTab from "../../InteractionTab/IntetractionTab";

function FullGameReview(props) {
  const navigate = useNavigate();
  const clickUserDetailHandle = () => {
    navigate(`/user/${props.review.username}`);
  };
  const clickGameNameHandle = () => {
    navigate(`/game/${props.review.gameid}`);
  };
  return (
    <div className="fullGameReview">
      <div className="topReview">
        <div className="userDetail">
          <img src={props.review.pfp} alt="profile" />
          <div className="reviewTextDetail">
            <p  className="username" onClick={clickUserDetailHandle}>{props.review.username}</p>
            <p
              onClick={clickGameNameHandle}
              style={{ display: props.from ? "block" : "none" }}
            >
              {" "}
              {props.review.gamename}
            </p>
          </div>
        </div>
        <div className="recommendation">
          <img
            src={
              props.review.recommend ? "/recommend.png" : "/notRecommend.png"
            }
            alt={props.review.recommend ? "recommend" : "notRecommend"}
          />
          <p>recommend</p>
        </div>
      </div>
      <p>{props.review.reviewtext}</p>
      <InteractionTab
        reviewid={props.review.reviewid}
        userid={props.review.userid}
        hasliked={props.review.hasliked}
      />
    </div>
  );
}

export default FullGameReview;
