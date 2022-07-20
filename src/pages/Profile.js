import React from "react";
import { Link } from "react-router-dom";
import './Profile.css';
import { defaultImgs } from "../defaultimgs";
import TweetInFeed from "../components/TweetInFeed";
import {useMoralis, useMoralisWeb3Api} from "react-moralis";

const Profile = () => {
  const {Moralis} = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <div className="pageIdentify">Profile</div>
      <img className="profileBanner" src={user.attributes.banner? user.attributes.banner : defaultImgs[1]}></img>
      <div className="pfpContainner">
        <img className="profilePFP" src={user.attributes.pfp? user.attributes.pfp : defaultImgs[0]}></img>
        <div className="profileName">{user.attributes.username}</div>
        <div className="profileWallet">
          {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
        </div>
        <div className="profileBio">
          {user.attributes.boi}
        </div>
        <Link to="/settings">
          <div className="profileEdit">Edit Profile</div>
        </Link>
        <div className="profileTabs">
          <div className="profileTab">
          History Publication
          </div>
        </div>

        <TweetInFeed profile={true}></TweetInFeed>  
      </div>
    </>
  );
};

export default Profile;

