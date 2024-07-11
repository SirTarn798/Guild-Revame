import { useNavigate, useParams } from "react-router-dom";
import "./SearchGame.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import SearchGamePanel from "../../components/SearchGamePanel/SearchGamePanel";
import { useEffect } from "react";
import useUserStore from "../../../lib/userStore";

function SearchGame() {
  const params = useParams();
  const gameName = params.gameName;
  const {currentUser} = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="searchGameContainer">
      <Navigator />
      <SearchGamePanel gameName={gameName} />
      <TopCurators />
    </div>
  );
}

export default SearchGame;
