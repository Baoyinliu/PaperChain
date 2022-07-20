import React, { useEffect, useState } from "react";
import "./TweetInFeed.css";
import filecoinOrbit from "../images/filecoinOrbit.jpeg";
import { defaultImgs } from "../defaultimgs";
import pfp5 from "../images/pfp5.png";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";

const FileTransactions = () => {
  
  const [fileDAtr, setFileDAtr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(()=>{
    async function getFileDs() {
      try {
        const FileTransactions = Moralis.Object.extend("FileTransactions");
        const query = new Moralis.Query(FileTransactions);
        
        query.equalTo("filerAcc", account);

        const results = await query.find();
        setFileDAtr(results);

      } catch (error) {
        console.log(error);
      }
    }
    getFileDs();
  },)

  return (
    <>
    {fileDAtr?.map((e,i)=>{
      return(
        <div className="feedTweet">
          <div className="completeTweet">
            <div className="who">
              <div className="accWhen">{
                `${e.attributes.filerAcc.slice(0, 4)}...${e.attributes.filerAcc.slice(38)}.
                ${e.createdAt.toLocaleString('en-us', {month: 'short'})}
                ${e.createdAt.toLocaleString('en-us', {day: 'numeric'})}
                `
              }</div>
            </div>
            <div className="tweetContent">
              <li>File id: {e.attributes.ffid}</li>
              {
                <li><a href={e.attributes.furl?e.attributes.furl:null} >下载地址(请勿随意分享)</a></li>
              }
              
            </div>
          </div>
        </div>

      );

    }).reverse()
  }
    </>
  );
};

export default FileTransactions;

