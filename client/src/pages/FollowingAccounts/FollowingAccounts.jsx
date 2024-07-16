import "./FollowingAccounts.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import { useEffect, useState } from "react";
import useUserStore from "../../../lib/userStore";
import UserElement from "./UserElement/UserElement";

function FollowingAccounts() {
  const { currentUser } = useUserStore();
  const [followingAccounts, setFollowingAccounts] = useState([]);

  useEffect(() => {
    const getFollowing = async () => {
      const link = "http://localhost:3000/getFollowing";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: currentUser,
          }),
        });
        const data = await response.json();
        setFollowingAccounts(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getFollowing();
  }, [currentUser]);

  return (
    <div className="followingAccountsContainer">
      <Navigator />
      <div className="followingAccContent">
        <h2>Accounts you are following</h2>
        {followingAccounts.map((user) => {
          return <UserElement pfp={user.pfp} username={user.username} userid={user.userid}/>;
        })}
      </div>
      <TopCurators />
    </div>
  );
}

export default FollowingAccounts;
