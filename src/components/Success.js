import { Alert, Card, Button } from "react-bootstrap";

export const Success = ({fids, setFids, fpaths, setFpaths, setSendingState}) => {     
    setSendingState(false);

    const onGoBack = () => {
        setFids([]);

    } 

    return (
        <div>
            <Card.Text>
                <Alert variant='light'> 
                    Files have been sent to IPFS successfully
                </Alert>
                <div style={{'color': 'white ', 'font-weight': '600','justify-content': 'center'}}>
                    <ul> {fids.map(function(fid, index) {
                            return <li>文件id：{fid}</li>
                        })}
                    </ul>
                    <ul>
                        {fpaths.map(function(path, index) {
                            return <li><a href={path} >下载地址(请勿随意分享)</a></li>
                        })}
                    </ul>
                    </div>
                <Button
                        variant='success'
                        onClick={onGoBack}
                    >
                        Go Back
                    </Button>
            </Card.Text>
        </div>
    )
}