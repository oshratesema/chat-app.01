import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'
import Logo from '../assets/logo.svg'
import Dropdown from 'react-bootstrap/Dropdown';



function Chat() {
  const socket = useRef()
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const checkLocalStorage =  async () => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }else{
      setCurrentUser(
        await JSON.parse(localStorage.getItem('chat-app-user')))
    }
  }

    const backToAvatar = async () => {
      if(currentUser) {
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }else{
       navigate('/setAvatar')
     }
   }
  }

  useEffect(() => {
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  },[currentUser])

   useEffect(() =>{
     backToAvatar()
   },[currentUser])

   useEffect(() =>{
    checkLocalStorage()
  },[])

  const handleChatChange = (chat) => {
        setCurrentChat(chat)
  }
  return (
    <Container>
      <div className='brand d-flex d-md-none'>
              <img src={Logo} alt="logo" />
              <h3>snappy</h3>
      </div>
      <div className="container px-0">
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
           {
            currentChat === undefined ? 
            <Welcome currentUser={currentUser}/> :
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
           }
      </div>
    </Container>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container {
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 30% 70%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
  @media screen and (min-width: 414px) and (max-width: 720px) {
    grid-template-columns: 0% 100%;
  }
  @media screen and (min-width: 375px) and (max-width: 414px) {
    grid-template-columns: 0% 100%;
  }
}
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  color: white;
  img {
    height: 2rem;
  }

`

;

export default Chat