import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Buffer} from 'buffer';
import { setAvatarRoute } from "../utils/APIRoutes";


export default function SetAvatar() {

    const api = 'https://api.multiavatar.com/45678946'
    const navigate = useNavigate()
    const [avatars, setAvatar] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const SetProfilePicture = async () => { }

    useEffect( () => {
        const data = [];
        const x = async () => {
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data)
                data.push(buffer.toString('base64'))
    
            }
        }
        setAvatar(data)
        setIsLoading(false)
    }, [])


    return (
        <>
            <Container>
                <div className="title-container">
                    <h1>pick an Avatar as your profile picture</h1>
                </div>
                <div className="avatars">{
                    avatars.map((avatar, index) => {
                        return (
                            <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
                                <img src={`data:image/svg+xml;base64, ${avatar}`} alt="avatar" onClick={() => { selectedAvatar(index) }} />
                            </div>
                        )
                    })
                }</div>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div``;
