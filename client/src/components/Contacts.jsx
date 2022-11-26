import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [open, setOpen] = useState(false);

    useEffect(() => {
     if(currentUser){
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
     }
    },[currentUser])

    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    }

    const handleDropdown = () => {
      setOpen(!open)
    }

    

    return (
      <>
      <Dropdown className='drop-down d-flex d-md-none justify-content-start' style={{height:'50px'}}>
      <Dropdown.Toggle variant="success" className='DropdownToggle bg-dark col-12 border border-dark' id="dropdown-basic" style={{width:'320px'}}>All Contacts</Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-menu bg-dark'style={{width:'320px'}}>
            <div className="contacts d-flex flex-column bg-dark">
              {contacts.map((contact, index) => {
                return (
                  <div key={contact._id} className={` d-flex align-items-center mb-4 justify-content-between border-bottom border-1 contact ${
                      index === currentSelected ? "selected" : ""
                    }` }
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar col-3 mb-3">
                      <img className='col-12'
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3 className='text-white me-2 '>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}

            </div>
      </Dropdown.Menu>
      </Dropdown>
      {/* full-screen */}
      <div className='d-none d-md-flex'>
        {currentUserImage && currentUserName && (
          <Container style={{width:'100%'}}>
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h3>snappy</h3>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div key={contact._id} className={`contact overflow-hidden ${ index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3 className=''>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}

            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )}        
      </div>
      </>
    );
  }


  const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
        height: 2rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }
    .contacts {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      gap: 0.8rem;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        .avatar {
          img {
            height: 3rem;
          }
        }
        .username {
          h3 {
            color: white;
            font-size: 99%;
          }
        }
      }
      .selected {
        background-color: #9a86f3;
      }
    }
    .current-user {
      background-color: #0d0d30;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      .avatar {
        img {
          height: 4rem;
          max-inline-size: 100%;
        }
      }
      .username {
        h2 {
          color: white;
          margin-right: 9px;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }    
    }

  
  `;



