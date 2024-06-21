import "./TopCurators.css";
import TopCurator from "./TopCurator/TopCurator";

function TopCurators() {
  return (
    <div className="topCuratorsContainer">
      <form action="" className="searchUser">
        <input type="text" name="username" placeholder="Search a user..." />
        <button>Search</button>
      </form>
      <h1>Top Curators</h1>
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
      <TopCurator />
    </div>
  );
}

export default TopCurators;
