import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import Login from "./pages/Login/Login";
import Following from "./pages/Follows/Following";
import SearchGame from "./pages/SearchGame/SearchGame";
import useUserStore from "../lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Game from "./pages/Game/Game";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);


  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/following" element={<Following />} />
        <Route path="/searchgame/:gameName" element={<SearchGame />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
