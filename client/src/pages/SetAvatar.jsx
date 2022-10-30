import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate} from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";


export default function setAvatar() {

const api = 'https://api.multiavatar.com/45678946'
const navigate = useNavigate()
const [avatars, setAvatars] = useState([]);
const [selectedAvatar, setSelectedAvatar] = useState([]);
const [isLoading, setIsLoading] = useState(undefined);

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
}

constSetProfilePicture = async () => {
    useEffect(() => {
        const data = [];
        
    },[])
}

  return (
    <>
    <Container>
        <div className="title-container">
            <h1>pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
            {

            }
        </div>
    </Container>
    <ToastContainer/>
    </>
  )
}

const Container = styled.div``;
