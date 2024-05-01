import axios from 'axios';
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBCheckbox,
  MDBContainer,
  MDBCardImage
}
from 'mdb-react-ui-kit';

import "./css/custom.css";
// import "./css/all.min.css";
import "./css/core.min.css";
import * as config from './config';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState('');
  // const [register, setRegister] = useState(false);

  

  const handleClick = () => {

    const logInfo = {"rememberMe":remember, "email":email , "password": password}
   
    axios.post(config.API_URL, logInfo).then((res) => {
      if (res.data.id !== ''){
        window.location.href="/index";
        console.log(res.data);
        localStorage.setItem("token", res.data.id);
        localStorage.setItem("username", `${res.data.user.firstName  } ${  res.data.user.lastName}`);
        localStorage.setItem("useremail", res.data.user.email);
        localStorage.setItem("userid", res.data.userId);
        localStorage.setItem("logstatus", true);
      }
      else {
        alert("Server connect Error!")
      }
    });
  }

  // const registerClick = (e) => 
  // {
     
  //    if(e.target.id === 'register')setRegister(true)
  //    else setRegister(false)
  // }

  const onChangePass = (e) => {

     setPassword(e.target.value); 
  }

  const onChangeEmail = (e) => {
      setEmail(e.target.value);
  }

  const onRememberChecked = (e) =>{
    setRemember(e.target.value);
  }

  return (
    
    <MDBContainer fluid className='p-4' style={{ 
      background: 'url("../../public/assets/Mask_group@2x.png") center/cover', 
      minHeight: '100vh',
      overflow:'hidden'
    }}>
      <div style={{
          display:'flex',
          textAlign: 'center', 
          position: 'absolute',
          marginLeft: '3.28%',
          marginTop: '2.56%',
          zIndex: '1',
        }}>
        <MDBCardImage src="assets/logo@2x.png" alt="logo" style={{height: '75px', width: '81px'}} />
        <p style={{  
          marginLeft: '27px',
          fontSize: '48px',
          fontWeight: 'normal',
          color: '#FFFFFF',
          }}>Running Kiddos</p>
      </div>

      <MDBRow  style={{marginTop: '1%'}}>
        <MDBCol md='1'> </MDBCol>
        <MDBCol md='5' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
          <span className="h-title" style={{color:'#FFFFFF', fontSize: '4rem'}}>Effortless Lap <br/>Counting for <br/>Active <br/>Excellence!</span>
          </h1>

          <p className='px-3' style={{color: '#FFFFFF'}}>
            Introducing our cutting-edge app designed exclusively for PE teachers – the ultimate solution for seamless lap counting! Say goodbye to manual tallying and hello to efficiency. With our intuitive interface, effortlessly track and manage the number of laps your students run during physical education classes. The app provides real-time lap counts, allowing teachers to focus on motivating and encouraging students to achieve their fitness goals. Enhance your PE sessions with precision and ease – because counting laps should be as active as the students themselves!
          </p>

        </MDBCol>
        <MDBCol md='1'> </MDBCol>

        <MDBCol md='3' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <MDBCard className='my-5' >
            <MDBCardBody className='p-5'>

              <h2 className='text-left mb-4' style={{margin: '0px'}}>Sign In</h2>
              
              <MDBInput wrapperClass='mb-4' placeholder='Enter your email' id='form1' type='email'  onChange={onChangeEmail}/>
              <MDBInput wrapperClass='mb-4' placeholder='Enter your password' id='form2' type='password' onChange={onChangePass}/>

              <div className='d-flex justify-content-left mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember Me' onClick={onRememberChecked}/>
              </div>

              <MDBBtn style={{
                    backgroundColor: '#B9EC51', // Set the desired color
                    color: '#333333', // Set the text color
                    width: '100%',
                    height: '50px',
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    
              }}  onClick={handleClick}>Sign In</MDBBtn>
              <div style={{marginTop:'10px', display: 'flex', justifyContent:'space-between'}}>
                <p>
                  <a href='#'>Forgot Password?</a>
                </p>
                <p>
                  <a href='#' id="register">Create Account</a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
        <MDBCol md='1'> </MDBCol>
      </MDBRow>

    </MDBContainer>
  );

}

export default Login;