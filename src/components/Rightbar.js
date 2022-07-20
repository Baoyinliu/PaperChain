import { useState, useRef} from "react";
import './Rightbar.css';
import spaceshooter from "../images/spaceshooter.jpeg";
import netflix from "../images/netflix.jpeg";
import academy from "../images/academy.png";
import youtube from "../images/youtube.png";
import js from "../images/js.png";
import nftStorage from "../images/nftStorage.jpg";
import web3Storage from "../images/web3Storage.png";
import filecoinHK from "../images/filecoinHk.png";
import {Input, Checkbox} from "web3uikit";
import { SuccessD } from './SuccessD'
import { Sending } from './Sending'
import { SendError } from './SendError';
import { FileDownloader } from './FileDownloader';
import FileTransactions from "./FileTransactions";
import  FileFeed from './FileFeed';

const Rightbar = () => {

  const [fidsd, setFidsd] = useState([]);
  const [fpathsd, setFpathsd] = useState([]);
  const [ipfsErrord, setIpfsErrord] = useState(false);
  const [sendingd, setSendingStated] = useState(false);
  const [hist, setHist] = useState(false);

  const onHist = async (event) => {
    setHist(!hist);
    // return <FileTransactions/>;
  }

  const trends = [
    {
      img: filecoinHK,
      text: "Your data,your call, coding with Fileeconi.",
      link: "https://www.hackathon.city/",
    },
    {
      img: nftStorage,
      text: "Free decentralized storage for NFTs on IPFS and Filecoin.",
      link: "https://nft.storage/",
    },
    {
      img: web3Storage,
      text: "The easiest way to store data on the decentralized web.",
      link: "https://web3.storage/",
    },
    {
      img: spaceshooter,
      text: "Learn how to build a Web3 FPS game using unity...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
    },
    {
      img: netflix,
      text: "The fisrt Moralis Project! Let's Netflix and chill...",
      link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
    },
    {
      img: academy,
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: youtube,
      text: "Best youtube channel to learn about Web3...",
      link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
    },
  ];

  return (
    <div style={{ height: document.body.clientHeight - 50, overflow: 'auto' }}>
    <div className="rightbarContent" >
      <div style={{'margin-left': '15px','padding': '15px 40px 20px'}}>
        <Input 
          label="Search Paper"
          name ="Search Paper"
          prefixIcon="search"
          labelBgColor="white">
        </Input>
      </div>

      <div style={{'max-height': '500px','max-width': '500px','margin-top': '1px','padding': '15px 40px 20px'}}>
        <FileDownloader setFidsd={setFidsd} setIpfsErrord={setIpfsErrord}  setFpathsd={setFpathsd} setSendingStated={setSendingStated} ></FileDownloader>     
        { fidsd.length !== 0 ? <SuccessD fids={fidsd} setFids={setFidsd} fpaths={fpathsd} setFpaths={setFpathsd} setSendingState={setSendingStated} /> : null }
        { sendingd ? <Sending setSendingState={setSendingStated}/> : null }
        { ipfsErrord ? <SendError setIpfsError={setIpfsErrord} setSendingState={setSendingStated}/> : null }
      </div>
      <div style={{'margin-left': '15px','padding': '15px 40px 20px'}}>
        <Checkbox
          id="test-switch"
          label="历史交易记录"
          labelWhenChecked="交易记录"
          layout="switch"
          name="Test switch input"
          onBlur={onHist}
          onChange={onHist}
        />

        {hist && <FileTransactions/>}
      </div>
      
      <div className="FileFeedtrends">
        <FileFeed profile={true} rightbar = {false} style={{'max-width': '310px'}} />
      </div>
      

      
      <div className="trends">
        News For You
        {trends.map((e) => {
            return(
              <>
              <div className="trend" onClick={() => window.open(e.link)}>
                <img src={e.img} className="trendImg"></img>
                <div className="trendText">{e.text}</div>
              </div>
              </>
            )
        })}
      </div>

    </div>
    </div>
  );
};

export default Rightbar;

