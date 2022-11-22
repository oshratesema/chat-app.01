import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios'
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { useRef } from 'react';
import {v4 as uuidv4} from 'uuid';

export default function ChatContainer({currentChat, currentUser, socket}) {
    
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();


  const getMessages = async () => {
    if(currentChat){
      const response = await axios.post(getAllMessageRoute,{
        from: currentUser._id,
        to: currentChat._id
      })
    setMessages(response.data)
  }
}

  useEffect(() => {
    getMessages()
  },[currentChat])

    const handleSendMsg = async (msg) => {
     await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to: currentChat._id,
      message: msg
     });
     socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
     });

     const msgs= [...messages];
     msgs.push({fromSelf: true, message: msg});
     setMessages(msgs)
    };

    useEffect(() => {
      if(socket.current){
        socket.current.on('msg-receive', (msg) => {
          setArrivalMessage({fromSelf: false, message: msg});
        })
      }
    },[])

    useEffect(() => {
     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    },[arrivalMessage])

    useEffect(() => {
      scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

  return (
    <Container>
      <div className='chat-container d-flex flex-column mt-md-0 overflow-hidden' style={{height:'100%'}}>
        <div className="chat-header d-flex justify-content-between mt-5 mt-md-0" style={{height:'10%'}}>
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <div className='d-flex align-items-center'>
            <Logout/>
            </div>
        </div>
        <div className="chat-messages" style={{height:'80%'}}>
          {
            messages.map((message) => {
              return(
                <div ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${message.fromSelf ? 'sended' : 'received'}`}>
                    <div className="content">
                      <p>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <div className='chat-input-container' style={{height:'10%'}}>
        <ChatInput handleSendMsg={handleSendMsg}/>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
padding-top: 1rem;
display: grid;
// grid-template-rows: 98% 1% 1%;
flex-direction; column;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  padding: 0 1rem;
  gap: 1rem;
}
.chat-header {
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // height: 50px;
    // padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username{
        h3{
            color:white;
        }
      }
    }
 }
 .chat-messages {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message{
    display: flex;
    align-items: center;
    .content{
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 414px) and (max-width: 720px) {
        max-width: 90%;
      }

    }
  }
  .sended {
    justify-content: flex-end;
     .content{
      background-color: #4f04ff21;
     }
    }
    .received{
   justify-content: flex-start;
    .content{
      background:#9900ff20;
    }
    }
 }

 @media only screen 
 and (device-width : 414px) 
 and (device-height : 896px) 
 and (-webkit-device-pixel-ratio : 2) {

  display: flex;
  flex-direction: row;
  }

  @media screen and (min-width: 414px) and (max-width: 720px) {
    .chat-input-container{
   display: flex;
    }
  }

`;