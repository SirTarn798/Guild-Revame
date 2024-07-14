import "./EditUserPanel.css";
import { storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import useUserStore from "../../../lib/userStore";

function EditUserPanel() {
  const { currentUser, setNewUsername } = useUserStore();

  const [username, setUsername] = useState("");
  const [validateUsername, setValidateUsername] = useState("neutral");

  const [pfp, setPfp] = useState({
    file: null,
    url: null,
  });

  const [banner, setBanner] = useState({
    file: null,
    url: null,
  });

  async function upload(file) {
    let date = new Date();
    let storageRef = ref(storage, `images/${date + file.name}`);
    try {
      const snapshot = await uploadBytesResumable(storageRef, file);
      const imageLink = await getDownloadURL(snapshot.ref);
      return imageLink;
    } catch (err) {
      console.log(err);
    }
  }

  const checkUsernameValidation = async (e) => {
    e.preventDefault();
    if (username === "") {
      alert("Please enter username");
      return;
    }
    const link = "http://localhost:3000/checkUsernameExistence";
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });
      const data = await response.json();
      if (data.usernameexists) {
        setValidateUsername("reject");
      } else {
        setValidateUsername("correct");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const applyChanges = (e) => {
    e.preventDefault();
    handleChangeUsername();
    handleUploadBanner();
    handleUploadPfp();
    alert("Changes have been applied.");
  };

  async function handleChangeUsername() {
    if (validateUsername === "reject") {
      alert("That username already exists.");
    } else if (username.trim().length > 0 && validateUsername === "neutral") {
      alert("Please validate the username first.");
      return false;
    } else if (username.trim().length > 0 && validateUsername === "correct") {
      const link = "http://localhost:3000/changeUsername";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: currentUser, username: username }),
        });
        setNewUsername(username);
      } catch (err) {
        console.log(err.message);
      }
    }
    return true;
  }

  const handleUploadPfp = async () => {
    if (pfp.file) {
      const link = "http://localhost:3000/uploadPfp";
      try {
        const uploadPfp = await upload(pfp.file);
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: uploadPfp, userid: currentUser }),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const handleUploadBanner = async () => {
    if (banner.file) {
      const link = "http://localhost:3000/uploadBanner";
      try {
        const uploadBanner = await upload(banner.file);
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: uploadBanner, userid: currentUser }),
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handlePfp = (e) => {
    if (e.target.files[0]) {
      setPfp({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleBanner = (e) => {
    if (e.target.files[0]) {
      setBanner({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className="editUserPanel">
      <h1>Edit User</h1>
      <form className="editUserElementContainer">
        <div className="editUserElement">
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={checkUsernameValidation}>Validate</button>
          <img
            className="validateStatus"
            src="/correct.png"
            alt="correct"
            style={{
              display:
                validateUsername === "neutral" || validateUsername === "reject"
                  ? "none"
                  : "block",
            }}
          />
          <img
            className="validateStatus"
            src="/reject.png"
            alt="reject"
            style={{
              display:
                validateUsername === "neutral" || validateUsername === "correct"
                  ? "none"
                  : "block",
            }}
          />
        </div>
        <div className="editUserElement">
          <p>Profile Picture</p>
          <img
            className="profileImages"
            src={pfp.url ? pfp.url : "/user.png"}
          />
          <label htmlFor="choosePfp">Upload an Image</label>
          <input
            type="file"
            id="choosePfp"
            style={{ display: "none" }}
            onChange={handlePfp}
          ></input>
        </div>
        <div className="editUserElement">
          <p>Profile Banner</p>
          <img
            className="profileImages"
            src={banner.url ? banner.url : "/user.png"}
          />
          <label htmlFor="chooseBanner">Upload an Image</label>
          <input
            type="file"
            id="chooseBanner"
            style={{ display: "none" }}
            onChange={handleBanner}
          ></input>
        </div>
        <button onClick={applyChanges}>Apply Changs</button>
      </form>
    </div>
  );
}

export default EditUserPanel;
