import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = "https://api.multiavatar.com/45678946";
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [allAvatars, setAllAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


 const navigateToLogin =  async () => {
    if(!localStorage.getItem('chat-app-user')){
        navigate('/login')
    }

 }

 console.log(selectedAvatar);

 const SetProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem('chat-app-user')
      );
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (user.isAvatarImageSet === false ||  user.avatarImage === '' ) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  
   
  const getAvatars = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
      console.log(image);
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatar(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAvatars();
    // avatarsData()
    navigateToLogin()
  }, []);

  return (
    <>
    {
    isLoading ? <Container>
        <img src={loader} alt="loader" className="loader" />
        </Container> : (

      <Container>
        <div className="title-container">
          <h1>pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64, ${avatar}`}
                  alt="avatar"
                  onClick={() => {
                    setSelectedAvatar(index);
                  }}
                />
              </div>
            );
          })}
        </div>
        <button className="submit-btn" onClick={()=>SetProfilePicture()}>SET AS PROFILE PICTURE</button>
      </Container>
        )
    }
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  @media screen and (min-width: 414px) and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    @media screen and (min-width: 414px) and (max-width: 720px) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
