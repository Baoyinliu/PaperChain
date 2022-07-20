//import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import {useState} from 'react';
// import { Button, Form } from "react-bootstrap";
import {Button} from "web3uikit";
import ReactFileReader from "react-file-reader";
import Dwetransfer from "../contractABIs/Dwetransfer.json"
import {useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api} from "react-moralis"
import { BigNumber, ethers } from "ethers";
import {Form, Icon} from"web3uikit"


export const FileDownloader = ({setFidsd, setIpfsErrord, setFpathsd, setSendingStated}) => {

    const {Moralis} = useMoralis();
    const user = Moralis.User.current();
    const onDownload = async (event) => {
        // event.preventDefault();
        console.log(event['data'][0]['inputResult'])
        try {
            setSendingStated(true);
            const contractAddress = "0xeC22892e2873E481162559b8Be06F0147D5c05DE";
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(contractAddress, Dwetransfer.abi, signer)
            const options2 = {value: ethers.utils.parseEther("0.2")};
            let tx = await contract.getFile(BigNumber.from(event['data'][0]['inputResult']), options2);
            let rc = await tx.wait();
            console.log("Contract executed successfully!")
            console.log(rc.events[0].args)
            const fileId = BigNumber.from(rc.events[0].args["id"]._hex).toNumber();
            // console.log(fileId)
            setFidsd([fileId]);
            setFpathsd([rc.events[0].args["fileUrl"]])

            const FileTransactions = Moralis.Object.extend("FileTransactions");
    
            const newFileT = new FileTransactions();
            newFileT.set("furl", rc.events[0].args["fileUrl"]);
            newFileT.set("ffid", fileId);
            newFileT.set("filerAcc", user.attributes.ethAddress);

            await newFileT.save();
                
        } catch  {
            setSendingStated(false);
            console.log("Failed to download to IPFS");
        }
        
    }

    return (

        <div>
            <Form
                buttonConfig={{
                    onClick: function noRefCheck(){},
                    theme: 'primary'
                }}
                data={[
                    {
                        name: 'File ID',
                        type: 'tel',
                        validation: {
                            required: true
                        },
                        value: ''
                    },
                ]}
                onSubmit={onDownload}
                title="Download"
            />
            
        </div>
    )
}