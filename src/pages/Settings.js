import React, { useEffect } from "react";
import './Settings.css';
import {Input} from "web3uikit";
import { defaultImgs } from "../defaultimgs";
import { useState, useRef} from "react";
import pfp1 from "../images/pfp1.png";
import pfp2 from "../images/pfp2.png";
import pfp3 from "../images/pfp3.png";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import {useMoralis, useMoralisWeb3Api} from "react-moralis"



const Settings = () => {
  const [selectedPFP, setSelectedPFP] = useState();
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState(defaultImgs[1]);
  const [theFile2, setTheFile2] = useState();
  const [Webtoken, setWebtoken] = useState();
  const inputFile = useRef(null);
  const inputFile2 = useRef(null);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const pfps = [pfp1,pfp2,pfp3,pfp4,pfp5]; 
  const {account, isAuthenticated, Moralis} = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  //const [pfps, setPfps] = useState([])

  const User = Moralis.Object.extend("_User");
  const query = new Moralis.Query(User);
  const user = Moralis.User.current(); 
  useEffect(()=>{
    const fetchNFTS = async()=>{
      const options = {
        chain: "ropsten",
        address: account
      }
      const ropstenNFTS = await Web3Api.account.getNFTs(options);
      const images = ropstenNFTS.result.map(
        (e) => resovleLink(JSON.parse(e.metadata)?.image)
      );
      //setPfps(images);
    }
    fetchNFTS();

    
    
  },[isAuthenticated, account])

  const resovleLink = (url) => {
    if(!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  }

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const onBannerClick2 = () => {
    inputFile2.current.click();
  };

  const changeHandler2 = (event) => {
    const img = event.target.files[0];
    setTheFile2(img);
    setSelectedFile2(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const myDetails = await query.first();
    let head;

    if(bio) {
      myDetails.set("boi", bio);
    }
    if(theFile2) {
      const data = theFile2;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      head = file.ipfs();
      myDetails.set("pfp", file.ipfs());
    }
    if(username) {
      myDetails.set("username", username);
    }
    if(Webtoken) {
      myDetails.set("webtoken", Webtoken);
    }
    
    if(theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    await myDetails.save();

    const FileDs = Moralis.Object.extend("FileDs");
    const FileDsquery = new Moralis.Query(FileDs);
    FileDsquery.equalTo("filerAcc", account);
    let FileDsresults = await FileDsquery.find();
    FileDsresults.map(async (e,i)=>{
      if(username)
        e.set("filerUserName", username)
      if(head)
        e.set("filerPfp", head)
      e.save();
      // console.log(username)
      // console.log(e)
    })

    const Tweets = Moralis.Object.extend("Tweets");
    const Tweetssquery = new Moralis.Query(Tweets);
    Tweetssquery.equalTo("tweeterAcc", account);
    let Tweetsresults = await Tweetssquery.find();
    Tweetsresults.map(async (e,i)=>{
      if(username)
        e.set("tweeterUserName", username)
      if(head)
        e.set("tweeterPfp", head)
      await e.save();
      // console.log(username)
      // console.log(e)
    })


    //window.location.reload();

  }

  return (
    <>
      <div className="pageIdentify">Settings</div>

      <div className="settingsPage">
        <Input
          label="Name"
          name="NameChange"
          width="100%"
          labelBgColor="white"
          value={user.attributes.username}
          onChange={(e)=> setUsername(e.target.value)}
        />

        <Input
          label="简介"
          name="bioChange"
          width="100%"
          labelBgColor="white "
          value={user.attributes.boi}
          onChange={(e) => setBio(e.target.value)}
        />

        <Input
          label="Web3.storage Token"
          type="password"
          name="webToken"
          width="100%"
          labelBgColor="white "
          value={user.attributes.webtoken}
          onChange={(e) => setWebtoken(e.target.value)}
        />

        <div className="pfp">
          个人头像
          <div className="pfpOptions">
            {/* {
              pfps.map((e,i)=>{
                return(
                <>
                  <img src={e} 
                      className={selectedPFP === e ? "pfpOptionSelected":"pfpOption"} 
                      onClick={()=>setSelectedPFP(pfps[i])}>
                  </img>
                </>
                )
              })
            } */}
            <img
              src={selectedFile2 === defaultImgs[1]?user.attributes.pfp:selectedFile2}
              onClick={onBannerClick2}
              className="pfpOptionSelected"
            ></img>
            <input
              type="file"
              name="file"
              ref={inputFile2}
              onChange={changeHandler2}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="pfp">
          背景图片
          <div className="pfpOptions">
            <img
              src={selectedFile === defaultImgs[1]?user.attributes.banner:selectedFile}
              onClick={onBannerClick}
              className="banner"
            ></img>
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="save" onClick={()=>saveEdits()}>
          Save
        </div>

      </div>

    </>
  );
};

export default Settings;

