import TopCurators from "../../components/TopCurators/TopCurators";
import MainPageContent from "../../components/MainPageContent/MainPageContent";
import "./MainPage.css";
import useUserStore from "../../../lib/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navigator from "../../components/Navigator/Navigator";

function MainPage() {
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
    <div className="mainPageContainer">
      <Navigator />
      <MainPageContent />
      <TopCurators />
    </div>
  );
}

export default MainPage;
