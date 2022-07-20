import React from "react";
import "./Home.css";
import { useState, useRef} from "react";
import { defaultImgs } from "../defaultimgs";
import {TextArea, Icon} from "web3uikit";
import TweetInFeed from "../components/TweetInFeed";
import {useMoralis, useWeb3ExecuteFunction} from "react-moralis"
import TweetData from "../contractABIs/Tweets.json";

const Home = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  const {Moralis} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const user = Moralis.User.current();

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };


  async function saveTweet() {
    if(!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);
    newTweet.set("Stars", 0)
    newTweet.set("Comments", [])

    if(theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();

  }

  async function maticTweet() {
    if(!tweet) return;
    let img;
    if(theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else {
      img = "no img";
    }

    let options = {
      contractAddress: "0x200cD8444e876e7B49a851722b942337ceAA3906",
      functionName: "addTweet", 
      abi: TweetData.abi,
      params: {
        text: tweet,
        img: img,
      },
      msgValue: Moralis.Units.ETH(0.1),
    }

    contractProcessor.fetch({
      params:options,
      onSuccess:()=>{
        saveTweet();
      },
      onError:(error)=>{
        console.log(error);
      }
    })
    
  }

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img 
            src={user.attributes.pfp? user.attributes.pfp : defaultImgs[0]} className="profilePic" >
          </img>
          <div className="tweetBox">
            <TextArea
              label=""
              placeholder="Type here field"
              name="tweetTextArea"
              onBlur={function noRefCheck(){}}
              type="text"
              width="95%"
              value = "快来发表动态吧！！"
              onChange={(e) => setTweet(e.target.value)}>
            </TextArea>
            {selectedFile && (
              <img src={selectedFile} className="tweetImg"></img>
            )}

            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                    type="file"
                    name="file"
                    ref={inputFile}
                    onChange={changeHandler}
                    style={{ display: "none"}}
                  />
                  <Icon fill="#1DA1F2" size={30} svg="image"></Icon>
              </div>

              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>Publish</div>
                  {/* <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#8247e5" }}>
                    Chain
                    <Icon fill="#ffffff" size={20} svg="chainlink" />
                  </div> */}
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
