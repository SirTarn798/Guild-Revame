import "./EditUser.css";
import Navigator from "../../components/Navigator/Navigator";
import TopCurators from "../../components/TopCurators/TopCurators";
import EditUserPanel from "../../components/EditUserPanel/EditUserPanel";
import useUserStore from "../../../lib/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EditUser() {
  const { currentUser } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  return (
    <div className="editUserContainer">
      <Navigator />
      <EditUserPanel />
      <TopCurators />
    </div>
  );
}

export default EditUser;
