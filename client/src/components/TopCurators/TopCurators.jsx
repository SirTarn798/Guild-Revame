import "./TopCurators.css";
import TopCurator from "./TopCurator/TopCurator";
import { useEffect, useState } from "react";

function TopCurators() {

  const [topCurators, setTopCurators] = useState([]);

  useEffect(() => {
    const getTopCurators = async () => {
      const link = "http://localhost:3000/getTopCurators";
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTopCurators(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getTopCurators();
  }, []);

  return (
    <div className="topCuratorsContainer">
      <form action="" className="searchUser">
        <input type="text" name="username" placeholder="Search a user..." />
        <button>Search</button>
      </form>
      <h1>Top Curators</h1>
      {topCurators.map((user) => {return(<TopCurator username={user.username} pfp={user.pfp} key={user.userid}/>)})}
    </div>
  );
}

export default TopCurators;
