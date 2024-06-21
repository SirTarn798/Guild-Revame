import Authorization from "../../components/Authorization/Authorization";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../lib/userStore";
import { useEffect } from "react";

function Login() {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (currentUser) {
    return null; 
  }
  return (
    <div className="loginContainer">
      <Authorization />
    </div>
  );
}

export default Login;
