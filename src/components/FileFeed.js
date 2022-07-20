import React, { useEffect, useState } from "react";
import "./TweetInFeed.css";
import filecoinOrbit from "../images/filecoinOrbit.jpeg";
import { defaultImgs } from "../defaultimgs";
import pfp5 from "../images/pfp5.png";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";

const FileFeed = (profile, rightbar) => {
  
  const [fileDAtr, setFileDAtr] = useState();
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current(); 

  useEffect(()=>{
    async function getFileDs() {
      try {
        const FileDs = Moralis.Object.extend("FileDs");
        const query = new Moralis.Query(FileDs);
        if(profile.profile) {
          query.equalTo("filerAcc", account);
        }

        const results = await query.find();
        setFileDAtr(results);

      } catch (error) {
        console.log(error);
      }
    }
    getFileDs();
  }, [profile])

  return (
    <>
    {fileDAtr?.map((e,i)=>{
      return(
        <div className="feedTweet">
          <img src={e.attributes.filerPfp?e.attributes.filerPfp:defaultImgs[0]} className="profilePic"></img>
          <div className="completeTweet">
            <div className="who">
              {e.attributes.filerUserName}
              <div className="accWhen">{
                `${e.attributes.filerAcc.slice(0, 4)}...${e.attributes.filerAcc.slice(38)}.
                ${e.createdAt.toLocaleString('en-us', {month: 'short'})}
                ${e.createdAt.toLocaleString('en-us', {day: 'numeric'})}
                `
              }</div>
            </div>
            <div className="tweetContent">
              {e.attributes.fileDescrip}
              {e.attributes.fileImg && (
                <img src={e.attributes.fileImg} className="tweetImg"></img>
              )}
              
              <li>File id: {e.attributes.ffid}</li>
              {
                (profile.profile == true) && <li><a href={e.attributes.furl?e.attributes.furl:null} >下载地址(请勿随意分享)</a></li>
              }
              
            </div>
            {(rightbar.rightbar == false) && <div className="interactions">
              <div className="interactionNums">
                <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
              </div>
              <div className="interactionNums">
                <Icon fill="#3f3f3f" size={20} svg="star" />
                12
              </div>
              <div className="interactionNums">
                <Icon fill="#3f3f3f" size={20} svg="chainlink" />
              </div>
            </div>}
          </div>
        </div>

      );

    }).reverse()
  }
    </>
  );
};

export default FileFeed;

