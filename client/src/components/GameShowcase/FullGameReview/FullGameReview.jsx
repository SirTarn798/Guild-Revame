import "./FullGameReview.css";
import { useNavigate } from "react-router-dom";
import InteractionTab from "../../InteractionTab/IntetractionTab";
import { useState } from "react";
import useUserStore from "../../../../lib/userStore";

function FullGameReview(props) {
  const { currentUser } = useUserStore();
  const [review, setReview] = useState(props.review);
  const navigate = useNavigate();
  const clickUserDetailHandle = () => {
    navigate(`/user/${props.review.username}`);
  };
  const clickGameNameHandle = () => {
    navigate(`/game/${props.review.gameid}`);
  };
  const clickReviewHandle = () => {
    navigate(`/review/${props.review.reviewid}`);
  };

  const handleDeleteReview = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review ? I will be permanently gone."
    );
    if (confirmDelete) {
      const link = "http://localhost:3000/deleteReview";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewid: props.review.reviewid,
          }),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
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
        <div className={props.review.recommend ? "recommend" : "notRecommend"}>
          <img
            src={
              props.review.recommend ? "/recommend.png" : "/notRecommend.png"
            }
            alt={props.review.recommend ? "recommend" : "notRecommend"}
          />
          <p>{props.review.recommend ? "Recommend" : "Not Recommend"}</p>
        </div>
      </div>
      <p onClick={clickReviewHandle} className="fullReviewContent">
        {props.review.reviewtext}
      </p>
      <img
        onClick={handleDeleteReview}
        src="/delete.png"
        className="deleteIcon"
        alt="trash"
        style={{
          display: props.review.reviewerid === currentUser ? "block" : "none",
        }}
      />
      <InteractionTab
        reviewid={review.reviewid}
        userid={review.userid}
        hasliked={review.hasliked}
        hassaved={review.hassaved}
        like={review.like}
      />
    </div>
  );
}

export default FullGameReview;
