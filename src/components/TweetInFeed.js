import React, { useEffect, useState } from "react";
import "./TweetInFeed.css";
import filecoinOrbit from "../images/filecoinOrbit.jpeg";
import canoe from "../images/canoe.jpeg";
import { defaultImgs } from "../defaultimgs";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import  Comments  from "./Comments";
//import { get } from "https-browserify";

const TweetInFeed = (profile) => {
  
  const [tweetAtr, setTweetAtr] = useState();
  const [comments, setComments] = useState();
  const { Moralis, account } = useMoralis();
  const Tweets = Moralis.Object.extend("Tweets");
  const query = new Moralis.Query(Tweets);

  useEffect(()=>{
    async function getTweets() {
      try {
        if(profile.profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();
        setTweetAtr(results);

      } catch (error) {
        console.log(error);
      }
    }
    getTweets();
  }, [profile])

  
  async function sstar(e, message) {
    let stared;
    for (let i = 0; i < tweetAtr.length; i++) {
      const object = tweetAtr[i];
      if(e === object.id) {
        stared = object;
        break;
      }
    }
    stared.set("Stars", stared.attributes.Stars + 1);
    await stared.save();
    const results = await query.find();
    setTweetAtr(results);

    // console.log(e)
    // console.log(tweetAtr)
    // console.log(stared)
    
  }

  async function addComments(e, index, message) {
    let stared;
    for (let i = 0; i < tweetAtr.length; i++) {
      const object = tweetAtr[i];
      if(e === object.id) {
        stared = object;
        break;
      }
    }
    stared.set("comFlag", !stared.attributes.comFlag);
    await stared.save();
    const results = await query.find();
    setTweetAtr(results);
    
  }

  return (
    <>
    {tweetAtr?.map((e,i)=>{
      return(
        <div className="feedTweet">
          <img src={e.attributes.tweeterPfp?e.attributes.tweeterPfp:defaultImgs[0]} className="profilePic"></img>
          <div className="completeTweet">
            <div className="who">
              {e.attributes.tweeterUserName}
              <div className="accWhen">{
                `${e.attributes.tweeterAcc.slice(0, 4)}...${e.attributes.tweeterAcc.slice(38)}.
                ${e.createdAt.toLocaleString('en-us', {month: 'short'})}
                ${e.createdAt.toLocaleString('en-us', {day: 'numeric'})}
                `
              }</div>
            </div>
            <div className="tweetContent">
              {e.attributes.tweetTxt}
              {e.attributes.tweetImg && (
                <img src={e.attributes.tweetImg} className="tweetImg"></img>
              )}
              
            </div>
            <div className="interactions">
              <div className="interactionNums">
                <div onClick={addComments.bind(this,e.id, i)} className="interacts">
                  <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                </div>
              </div>
              <div className="interactionNums">
                <div onClick={sstar.bind(this,e.id)} className="interacts">
                  <Icon fill="#3f3f3f" size={20} svg="star" />
                  {e.attributes.Stars}
                </div>
                
              </div>
              <div className="interactionNums">
                <Icon fill="#3f3f3f" size={20} svg="chainlink" />
              </div>
            </div>
            <div>
                  {e.attributes.comFlag && <Comments TargetO = {e}></Comments>}
            </div>
          </div>
        </div>

      );

    }).reverse()
  }

      <div className="feedTweet">
        <img src={pfp5} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            Filecoin
            <div className="accWhen">0x42..314 · 1h</div>
          </div>
          <div className="tweetContent">
            Excited about the Filecoin Orbit swag!
            <img src={filecoinOrbit} className="tweetImg"></img>
          </div>
          <div className="interactions">
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
          </div>
        </div>
      </div>

    </>
  );
};

export default TweetInFeed;

