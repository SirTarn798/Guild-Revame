import "./Following.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import FollowingContent from "../../components/FollowingContent/FollowingContent";
import useUserStore from "../../../lib/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Following() {
  const { currentUser } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  return (
    <div className="followingContainer">
      <Navigator />
      <FollowingContent />
      <TopCurators />
    </div>
  );
}

export default Following;
