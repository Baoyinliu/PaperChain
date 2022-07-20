import { useState, useRef} from "react";
import { Button, Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { FileUploader } from '../components/FileUploader'
import { SuccessD } from '../components/SuccessD'
import { Sending } from '../components/Sending'
import { SendError } from '../components/SendError';
import { FileDownloader } from '../components/FileDownloader';
import  FileFeed from '../components/FileFeed';
import {Form, Icon} from"web3uikit"

import './Upload.css';


const Download = (rightBar) => {
    
    const [fidsd, setFidsd] = useState([]);
    const [fpathsd, setFpathsd] = useState([]);
    const [ipfsErrord, setIpfsErrord] = useState(false);
    const [sendingd, setSendingStated] = useState(false);

  

  return (
    <>
      <div className="pageIdentify">{(rightBar.rightBar === false) && "Download"}</div>
      <div>
        <Container className="p-3">
            <Card className="mycard" 
            style={{'backgroundColor': '#222b34', 'border-radius': '25px',
                                                'min-height': '350px',
                                                'max-width': '800px',
                                                'margin-top': '20px',
                                                'padding': '20px'}}>
            <Card.Body>
                <Card.Title style={{'color':'white'}}>
                  Use IPFS & FileCoin To Download Paper 
                </Card.Title>

                <FileDownloader setFidsd={setFidsd} setIpfsErrord={setIpfsErrord}  setFpathsd={setFpathsd} setSendingStated={setSendingStated} ></FileDownloader>
                
                { fidsd.length !== 0 ? <SuccessD fids={fidsd} setFids={setFidsd} fpaths={fpathsd} setFpaths={setFpathsd} setSendingState={setSendingStated} /> : null }
                { sendingd ? <Sending setSendingState={setSendingStated}/> : null }
                { ipfsErrord ? <SendError setIpfsError={setIpfsErrord} setSendingState={setSendingStated}/> : null }

            </Card.Body>
            </Card>
        </Container>
            
      </div>
      <div className="profileTabs">
          <div className="profileTab">
            Papers
          </div>
      </div>
      <div>
        {(rightBar.rightBar === false)&&<FileFeed profile={false}/>}
      </div>
    </>
  );
};

export default Download;

