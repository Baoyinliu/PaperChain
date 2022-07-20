import React, { useEffect, useState } from "react";
import "./TweetInFeed.css";
import filecoinOrbit from "../images/filecoinOrbit.jpeg";
import { defaultImgs } from "../defaultimgs";
import pfp5 from "../images/pfp5.png";
import { Icon, Form } from "web3uikit";
import { useMoralis } from "react-moralis";

const Comments = (TargetO) => {
  
  const [fileDAtr, setFileDAtr] = useState();
  const { Moralis, account } = useMoralis();
  const Tweets = Moralis.Object.extend("Tweets");
  const query = new Moralis.Query(Tweets);

  useEffect(()=>{
    async function getFileDs() {
      try {
        
        
        setFileDAtr(TargetO.TargetO);
        console.log(fileDAtr)

      } catch (error) {
        console.log(error);
      }
    }
    getFileDs();
  },[TargetO])

  async function addCom(e) {
    let tar = TargetO.TargetO;
    const com = tar.attributes.Comments;
    com.push(e.data[0].inputResult)
    console.log(com)
    tar.set("Comments", com);
    console.log(tar)
    await tar.save();
    setFileDAtr(tar)
  }

  return (
    <>
    <div>
        <Form 
            buttonConfig={{
                onClick: function noRefCheck(){},
                theme: 'primary'
            }}
            data={[
                {
                inputWidth: '90%',
                name: 'comments',
                type: 'textarea',
                validation: {
                    required: true
                },
                value: ''
                }
            ]}
            onSubmit={addCom}
            title="Leave Your Comments!"
        />
    </div>
    {fileDAtr?.attributes.Comments.map((e,i)=>{
    return(
      <div className="feedTweet">
        <div className="completeTweet">
          <div className="who">
              {/* {console.log(fileDAtr)} */}
            <li>{e}</li>
          </div>
        </div>
      </div>

    );

   }).reverse()
  }
    
    </>
  );
};

export default Comments;

