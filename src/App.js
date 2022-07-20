import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Uploads from "./pages/Uploads";
import Download from "./pages/Download";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import {useMoralis} from "react-moralis";
import {Icon, ConnectButton} from"web3uikit"
// import Moralis from "moralis/types";

const App = () => {
  const {isAuthenticated, Moralis} = useMoralis();
  return (
    <>
    {isAuthenticated ? (
      <div className="page">
        <div className="sideBar">
          <Sidebar />
          <div className="logout"
            onClick={()=>{
              Moralis.User.logOut().then(()=>{
                window.location.reload();
              })
            }}> 
            Logout
          </div>
        </div>
        <div className="mainWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/upload" element={<Uploads />} />
            <Route path="/download" element={<Download rightBar={false}/>} />
          </Routes>
        </div>
        <div className="rightBar">
          <Rightbar/>
        </div>
      </div>
    ):(
      <div className="loginPage">
        <Icon
          fill="#ffffff"
          size={54}
          svg="doge"
        />
        <ConnectButton />
      </div>
    )}
     
    </>
  );
};

export default App;
