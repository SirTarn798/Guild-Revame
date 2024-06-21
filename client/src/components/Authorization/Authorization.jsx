import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Authorization.css";
import { auth } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../lib/userStore";

function Authorization() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [authStatus, setAuthStatus] = useState("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const {currentUser} = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    setAuthStatus("working");
    setDisableButtons(true);
    try {
      if (email === "" || password === "") {
        throw new Error("All fields are required");
      }
      await signInWithEmailAndPassword(auth, email, password);
      setAuthStatus("success");
    } catch (err) {
      setErrorMessage(err.message);
      setAuthStatus("fail");
    } finally {
      setLoginEmail("");
      setLoginPassword("");
      setDisableButtons(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthStatus("working");
    setDisableButtons(true);
    const formData = new FormData(e.target);
    const { email, username, password } = Object.fromEntries(formData);
    try {
      if (email === "" || password === "") {
        throw new Error("All fields are required");
      }
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setAuthStatus("success");
    } catch (err) {
      setErrorMessage(err.message);
      setAuthStatus("fail");
    } finally {
      setRegisterEmail("");
      setRegisterUsername("");
      setRegisterPassword("");
      setDisableButtons(false);
    }
  };

  return (
    <div className="LoginPage">
      <img src="logo.png" className="loginLogo" alt="" />
      <div className="login">
        <h1>Welcome back</h1>
        <p>Please login to continue</p>
        <form className="loginRegisForm" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button disabled={disableButtons}>Login</button>
        </form>
      </div>
      <div className="register">
        <p>Or if you don't have an account</p>
        <form className="loginRegisForm" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button disabled={disableButtons}>Register</button>
        </form>
        <div
          className="loader"
          style={{ display: authStatus === "working" ? "flex" : "none" }}
        ></div>
      </div>
      <p className="errorMessage">{errorMessage}</p>
    </div>
  );
}

export default Authorization;
