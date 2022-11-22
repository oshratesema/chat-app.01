import React from 'react'
import styled from 'styled-components';
import Robot from '../assets/robot.gif';


export default function Welcome({currentUser}) {
    console.log(currentUser);
  return (
    <Container>
        <img src={Robot} alt="Robot" />
        <h1>welcome <span>{currentUser?.username}!</span></h1>
        <h3>please select a chat to start Messaging</h3>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
text-align: center;

@media screen and (min-width: 414) and (max-width: 896) {
  background-color: pink;
}  

 img{
    height: 20rem;
 }
 span{
    color: #4e0eff;
 }



`;