import "./FullGameReview.css";
import { useNavigate } from "react-router-dom";
import InteractionTab from "../../InteractionTab/IntetractionTab";
import { useState } from "react";

function FullGameReview(props) {
  const [review, setReview] = useState(props.review);
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
            <p className="username" onClick={clickUserDetailHandle}>
              {props.review.username}
            </p>
            <p
              onClick={clickGameNameHandle}
              style={{ display: props.from ? "block" : "none" }}
            >
              {" "}
              {props.review.gamename}
            </p>
          </div>
        </div>
        <div
          className={
            props.review.recommend ? "recommend" : "notRecommend"
          }
        >
          <img
            src={
              props.review.recommend ? "/recommend.png" : "/notRecommend.png"
            }
            alt={props.review.recommend ? "recommend" : "notRecommend"}
          />
          <p>{props.review.recommend ? "Recommend" : "Not Recommend"}</p>
        </div>
      </div>
      <p>{props.review.reviewtext}</p>
      <InteractionTab
        reviewid={review.reviewid}
        userid={review.userid}
        hasliked={review.hasliked}
        hassaved={review.hassaved}
      />
    </div>
  );
}

export default FullGameReview;
