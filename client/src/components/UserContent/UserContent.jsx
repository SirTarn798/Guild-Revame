import "./UserContent.css";
import FullGameReview from "../GameShowcase/FullGameReview/FullGameReview";
import { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import { useLocation, useNavigate } from "react-router-dom";

function UserContent(props) {

  let location = useLocation();
  let query = new URLSearchParams(location.search);
  const [sort, setSort] = useState(query.get('sort'));

  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState([]);
  const { currentUser, currentUsername } = useUserStore();
  const [hasFollowed, setHasFollowed] = useState(false);

  const navigate = useNavigate();

  const handleEditUser = () => {
    navigate("/edituser");
  };

  const handleFollow = async () => {
    const link = "http://localhost:3000/follow";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followerID: currentUser,
          followingID: user[0]?.userid,
          follow: hasFollowed,
        }),
      });
      let data = await response.text();
      console.log(data);
      if (data === "success") {
        setHasFollowed(!hasFollowed);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    async function retrieveUsersInfo() {
      const linkUser = "http://localhost:3000/getUser";
      try {
        let response = await fetch(linkUser, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestFromUsername: props.username,
          }),
        });
        let data = await response.json();
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    retrieveUsersInfo();
  }, [props.username]);

  useEffect(() => {
    const getReview = async () => {
      const linkReview = "http://localhost:3000/getReviewFromUsername";
      try {
        if (user[0]) {
          const response = await fetch(linkReview, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              requestFromUsername: user,
              userid: currentUser,
            }),
          });
          const data = await response.json();
          if (sort === "recent") {
            data?.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
          } else if (sort === "popular") {
            data?.sort((a, b) => new Date(b.like) - new Date(a.like));
          }
          setReviews(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    const checkFollow = async () => {
      const link = "http://localhost:3000/checkFollow";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followerID: currentUser,
            followingID: user[0]?.userid,
          }),
        });
        let data = await response.json();
        setHasFollowed(data[0]?.hasfollowed);
      } catch (err) {
        console.log(err.message);
      }
    };

    getReview();
    checkFollow();
  }, [user]);

  return (
    <div className="userContent">
      <img
        src={user[0]?.banner}
        alt="background image"
        className="backgroundImage"
      />
      <div className="userPageDetail">
        <div className="imgAndTextUser">
          <img src={user[0]?.pfp} alt="profile picture" />
          <div className="userPageDetailText">
            <h3>{user[0]?.username}</h3>
            <p>{user[0]?.followers} Followers <a href="/followedAcccounts" style={{display : currentUser === user[0]?.userid ? "block" : "none"}}>78 Following</a></p>
          </div>
        </div>
        <button
          style={{
            display:
              currentUser != user[0]?.userid && !hasFollowed ? "block" : "none",
          }}
          onClick={handleFollow}
        >
          Follow
        </button>
        <button
          style={{
            display:
              currentUser != user[0]?.userid && hasFollowed ? "block" : "none",
          }}
          onClick={handleFollow}
        >
          Unfollow
        </button>
        <button
          className="editUserButton"
          style={{
            display: currentUser === user[0]?.userid ? "block" : "none",
          }}
          onClick={handleEditUser}
        >
          Edit User
        </button>
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
              <a href={`/user/${user[0]?.username}?sort=recent`}>Recent</a>
              <a href={`/user/${user[0]?.username}?sort=popular`}>Popular</a>
            </div>
          </div>
        </div>
        <div className="usersReviews">
          {reviews.map((review) => {
            return (
              <FullGameReview review={review} key={review.id} from="user" />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserContent;
