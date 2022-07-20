import React from "react";
import './Sidebar.css';
import {Link} from 'react-router-dom';
import {Logo, Icon} from "web3uikit";
import ipfsLogo from "../images/ipfs-logo.png";
import Web3StorageLogo from "../images/Web3Storage2.png"
import { defaultImgs } from "../defaultimgs";
import {useMoralis, useMoralisWeb3Api} from "react-moralis";

const Sidebar = () => {
  const {Moralis} = useMoralis();
  const user = Moralis.User.current();

  function goWeb3Storage() {
    //https://web3.storage/account/
    window.location.href="https://web3.storage/account/"
  }

  return (
    <>
     <div className="mysiderContent">
      <div className="menu">
        <div className="mydetails">
          <img src={ipfsLogo} className="profilePic"></img>
          <Icon fill="#000000" size={40} svg="fil"/>
          <Logo theme="icon" color="blue" size="regular"/> 
        </div> 
        <div onClick={goWeb3Storage}>
          <img src={Web3StorageLogo} className="Web3StorageLogoPic"></img>
        </div>
      
        <Link to="/" className="link">
          <div className="menuItems">
            <Icon fill="#252526" size={33} svg="list" />
            Home
          </div>
        </Link>
        <Link to="/profile" className="link">
          <div className="menuItems">
            <Icon fill="#252526" size={33} svg="user" />
            Profile
          </div>
        </Link>

        <Link to="/settings" className="link">
          <div className="menuItems">
            <Icon fill="#252526" size={33} svg="cog" />
            Settings
          </div>
        </Link>

        <Link to="/upload" className="link">
          <div className="menuItems">
            <Icon fill="#252526" size={33} svg="update" />
            Upload
          </div>
        </Link>
        <Link to="/download" className="link">
          <div className="menuItems">
            <Icon fill="#252526" size={33} svg="downloadCloud" />
            Download
          </div>
        </Link>
      </div>

      <div className="mydetails">
          <img src={user.attributes.pfp? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="profile">
            <div className="who">
              <div style={{'color':'black'}}>{user.attributes.username}</div>
            </div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
      </div>

     </div>
    </>
  );
};

export default Sidebar;

