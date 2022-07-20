import { useState, useRef} from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { FileUploader } from '../components/FileUploader'
import { Success } from '../components/Success'
import { Sending } from '../components/Sending'
import { SendError } from '../components/SendError';
import { FileDownloader } from '../components/FileDownloader';
import  FileFeed from '../components/FileFeed';
import './Upload.css';


const Uploads = () => {
    
    
    const [fids, setFids] = useState([]);
    const [fpaths, setFpaths] = useState([]);
    const [ipfsError, setIpfsError] = useState(false);
    const [sending, setSendingState] = useState(false);
  

  return (
    <>
      <div className="pageIdentify">Upload</div>
      <div>
        <Container className="p-3">
            <Card className="mycard" 
            style={{'backgroundColor': '#222b34', 'border-radius': '25px',
                                                'min-height': '400px',
                                                'max-width': '800px',
                                                'margin-top': '40px',
                                                'padding': '20px'}}>
            <Card.Body>
                <Card.Title style={{'color':'white'}}>
                  Use IPFS & FileCoin To Make Your Paper Chained 
                </Card.Title>
                { (fids.length === 0) && (sending === false) ? 
                <FileUploader setFids={setFids} setIpfsError={setIpfsError}  setFpaths={setFpaths} setSendingState={setSendingState} /> :null }
                { fids.length !== 0 ? <Success fids={fids} setFids={setFids} fpaths={fpaths} setFpaths={setFpaths} setSendingState={setSendingState} /> : null }
                { sending ? <Sending setSendingState={setSendingState}/> : null }
                { ipfsError ? <SendError setIpfsError={setIpfsError} setSendingState={setSendingState}/> : null }

            </Card.Body>
            </Card>
        </Container>
            
      </div>
      <div className="profileTabs">
          <div className="profileTab">
          My Uploaded Papers
          </div>
      </div>
      <div>
        <FileFeed profile={true} rightbar={false}/>
      </div>
    </>
  );
};

export default Uploads;

