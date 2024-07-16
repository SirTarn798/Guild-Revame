import { useNavigate } from "react-router-dom";
import "./MiniReview.css";

function MiniReview(props) {

  const navigate = useNavigate();

  const handleClickReview = () => {
    navigate(`/review/${props.reviewid}`)
  }

  return (
    <div className="miniReview" onClick={handleClickReview}>
      <div className="userInfo">
        <img src={props.pfp} />
        <p>{props.username}</p>
      </div>
      <p>{props.gamename}</p>
      <p>
        {props.reviewtext}
      </p>
    </div>
  );
}

export default MiniReview;
