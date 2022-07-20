import { Alert, Card, Button } from "react-bootstrap";

export const SuccessD = ({fids, setFids, fpaths, setFpaths, setSendingState}) => {     
    setSendingState(false);

    const onGoBack = () => {
        setFids([]);

    } 

    return (
        <div>
            <Card.Text>
                <div style={{'color': 'white', 'font-weight': '600','justify-content': 'center', 'padding':'10px'}}>
                    <ul><li>Get File's IPFS Link Successfully</li></ul>
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