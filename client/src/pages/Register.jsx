import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

function Register() {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('form')
    };

    const handleChange = (event) => {};

  return (
    <>
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <img src={logo} alt="Logo" />
                <h1>snappy</h1>
            </div>
            <input type="text" placeholder='Username' name='username' onChange={handleChange()} />
            <input type="email" placeholder='email' name='email' onChange={handleChange()} />
            <input type="password" placeholder='password' name='password' onChange={handleChange()} />
            <input type="password" placeholder='Confirm Password' name='ConfirmPassword' onChange={handleChange()} />
            <button type='submit'>Create User</button>
            <span>Already have an account?</span> <Link to={'/Login'}>Login</Link>
        </form>
    </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
display: flex;
align-items: center;
gap: 1rem;
justify-content:center;
 img {
    height: 5rem ;
 }
 h1 {
    color: white;
    text-transform: uppercase;  
 }
 form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 3rem 5rem;
 }

input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &: focus{
        border: #00000076.1rem solid #997af0;
    }


}
}
`;

export default Register