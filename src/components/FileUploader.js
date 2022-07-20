//import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { useState, useRef} from "react";
import { Button, Form } from "react-bootstrap";
import ReactFileReader from "react-file-reader";
import Dwetransfer from "../contractABIs/Dwetransfer.json"
import {useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api} from "react-moralis"
import { BigNumber, ethers } from "ethers";
import '../pages/Home.css'
import {TextArea, Icon} from "web3uikit";
import { defaultImgs } from "../defaultimgs";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';



export const FileUploader = ({setFids, setIpfsError, setFpaths, setSendingState}) => {
    
    const [files, setFile] = useState([]); 
    const [selectedFile, setSelectedFile] = useState();
    const Web3Api = useMoralisWeb3Api();
    const {Moralis} = useMoralis();
    const user = Moralis.User.current();
    const [theFile, setTheFile] = useState();
    const [fileDescrip, setFileDescrip] = useState();
    const [furl, setFurl] = useState();
    const [ffid, setFfid] = useState();
    const inputFile = useRef(null);

    const onInputChange = (files) => {
        setFile(files) 
    }

    const onImageClick = () => {
        inputFile.current.click();
      };
    
    const changeHandler = (event) => {
        const img = event.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };

    async function saveFiles(ffid ,furl) {
        console.log("Saving Files1");
        if(!furl  ||  !ffid)  return;
        console.log("Saving Files2");
        const FileDs = Moralis.Object.extend("FileDs");
    
        const newFileD = new FileDs();
        console.log(furl)
        newFileD.set("fileDescrip", fileDescrip);
        newFileD.set("furl", furl);
        newFileD.set("ffid", ffid);
        newFileD.set("filerPfp", user.attributes.pfp);
        newFileD.set("filerAcc", user.attributes.ethAddress);
        newFileD.set("filerUserName", user.attributes.username);
    
        if(theFile) {
          const data = theFile;
          const file = new Moralis.File(data.name, data);
          await file.saveIPFS();
          newFileD.set("fileImg", file.ipfs());
        }
    
        await newFileD.save();
        console.log("Saving Files Done");
        //window.location.reload();
        alert('You Have Chained Paper Using IPFS & FileCoin');
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const options = {
            abi: [
              {
                path: "PaperChain/"+files.fileList[0].name,
                content: files.base64,
              },
            ],
        };
        console.log(files.fileList[0].name);
        console.log(files.fileList[0])
        try {
            setSendingState(true);
            let path;
            if(user.attributes.webtoken != null) {
                const client = new Web3Storage({ token: user.attributes.webtoken });
                const rootCid = await client.put([files.fileList[0]]);
                path = "https://"+rootCid+".ipfs.dweb.link"
            }else {
                alert("没有Web3.storageToken请及时注册")
                const Moralispath = await Web3Api.storage.uploadFolder(options);
                path = Moralispath[0].path
            }
            
            console.log(path)

            if(!path) return;
            
            const contractAddress = "0xeC22892e2873E481162559b8Be06F0147D5c05DE";
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, Dwetransfer.abi, signer)
            const options2 = {value: ethers.utils.parseEther("0.1")};
            let tx = await contract.addTweet(path, options2);
            let rc = await tx.wait();
            console.log("Contract executed successfully!")
            console.log(rc.events[0].args)
            const fileId = BigNumber.from(rc.events[0].args["id"]._hex).toNumber();
            console.log(fileId)
            setFids([fileId]);
            setFpaths([rc.events[0].args["fileUrl"]]);
            setFurl(rc.events[0].args["fileUrl"]);
            setFfid(fileId);
            // console.log(rc.events[0].args["fileUrl"]);
            // console.log(furl)
            saveFiles(fileId, rc.events[0].args["fileUrl"]);
                
        } catch  {
            setIpfsError(true);
            console.log("Failed to send to IPFS");
            setSendingState(false);
        }
        
    }


    return (
        <div>
            <div className="profileTweet">
                <img 
                    src={user.attributes.pfp? user.attributes.pfp : defaultImgs[0]} className="profilePic" >
                </img>
            <div className="tweetBox">
                <TextArea
                    label="paper description"
                    placeholder="Type here field"
                    name="tweetTextArea"
                    onBlur={function noRefCheck(){}}
                    type="text"
                    width="95%"
                    autoComplete
                    onChange={(e) => setFileDescrip(e.target.value)}>
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
                    <Icon fill="#1DA1F2" size={40} svg="image"></Icon>
                </div>
                <div style={{'color': 'white', 'font-weight': '600','justify-content': 'center'}}>
                    {files.length !== 0 ? files.fileList[0].name : "Click to upload"}
                </div>
                <div>
                    <ReactFileReader
                        fileTypes={[".png",".jpg",".gif", "jpeg", ".pdf"]}
                        base64
                        multipleFiles={!1}
                        handleFiles={onInputChange}>
                        <Button type="upload" style={{'border-radius': '1000px','border-style':'none',
                                                    'color': 'white', 'font-weight': '600','justify-content': 'center',
                                                    'backgroundColor':'#1DA1F2', 'max-width': '200px', 'display': 'flex',
                                                    
                                                'padding': '10px 20px'}}>
                            ChooseFile
                        </Button>
                    </ReactFileReader>
                </div>
                <br></br>
                <div className="tweetOptions">
                    {/* <div className="tweet" onClick={saveFiles(ffid, furl)}>Publish</div> */}
                    <div className="tweet" onClick={onSubmit} style={{ backgroundColor: "#8247e5" }}>
                        Publish <Icon fill="#ffffff" size={20} svg="chainlink" />
                    </div>
                </div>
                </div>
            </div>
            </div>
           
            
        </div>
    )
}