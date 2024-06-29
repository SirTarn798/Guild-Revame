import "./User.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import UserContent from "../../components/UserContent/UserContent";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../../../lib/userStore";
import { useEffect } from "react";

function User() {
  const params = useParams();
  const username = params.username;
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }
  return (
    <div className="userContainer">
      <Navigator />
      <UserContent username={username}/>
      <TopCurators />
    </div>
  );
}

export default User;
