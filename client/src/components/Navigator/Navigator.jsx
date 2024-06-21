import "./Navigator.css";
import useUserStore from "../../../lib/userStore";
import { auth } from "../../../lib/firebase";

function Navigator() {

  const {fetchUserInfo} = useUserStore();

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut();
  }

  return (
    <div className="navigatorContainer">
      <div className="navigatorButtons">
        <a href="/">
          <img src="/logo.png" className="logo" alt="" />
        </a>
        <a href="/">
          <img src="/home.png" />
          <p>Main</p>
        </a>
        <a href="/following">
          <img src="/people.png" />
          <p>Following</p>
        </a>
        <a href="/profile">
          <img src="/user.png" />
          <p>Profile</p>
        </a>
        <a href="/saved">
          <img src="/bookmark.png" />
          <p>Saved</p>
        </a>
      </div>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default Navigator;
