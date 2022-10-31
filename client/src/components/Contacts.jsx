import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'


export default function Contacts(contacts, currentUser) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
     if(currentUser){
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.currentUser);
     }
    },[currentUser])
    const changeCurrentChat = (index, contact) => {}

  return (
    <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className='brand'>
                    <img src="" alt="" />
                </div>
            </Container>
        )
    }

    </>
  )
}
const Container = styled.div``;