import "./EditUserPanel.css";
import { storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import useUserStore from "../../../lib/userStore";

function EditUserPanel() {
  const [pfpLink, setPfpLink] = useState("");
  const [bannerLink, setBannerLink] = useState("");

  const { currentUser } = useUserStore();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pfp.file) {
      const link = "http://localhost:3000/uploadPfp";
      try {
        setPfp(await upload(pfp.file));
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: pfp, userid: currentUser }),
        });
      } catch (err) {
        console.log(err.message);
        return;
      }
    }

    if (banner.file) {
      const link = "http://localhost:3000/uploadBanner";
      try {
        setBanner(await upload(banner.file));
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: banner, userid: currentUser }),
        });
      } catch (err) {
        console.log(err.message);
        return;
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
      <form className="editUserElementContainer" onSubmit={handleSubmit}>
        <div className="editUserElement">
          <p>Username</p>
          <input type="text" name="username" />
        </div>
        <div className="editUserElement">
          <p>Profile Picture</p>
          <img src={"/user.png"} />
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
          <img src={"/user.png"} />
          <label htmlFor="choosePfp">Upload an Image</label>
          <input
            type="file"
            id="choosePfp"
            style={{ display: "none" }}
            onChange={handleBanner}
          ></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditUserPanel;
