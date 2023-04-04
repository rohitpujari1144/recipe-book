import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios'

function Login() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        axios.get('https://recipe-wbww.onrender.com/allUsers')
            .then((response) => {
                setAllUsers(response.data)
                // console.log(allUsers);
            });
    }, [allUsers])

    function loginCkick() {
        const usernameInput = document.getElementById('usernameInput')
        const passwordInput = document.getElementById('passwordInput')
        const usernameError = document.getElementById('usernameError')
        const passwordError = document.getElementById('passwordError')
        if (usernameInput.value === '') {
            usernameError.innerText = '*Please enter username'
            usernameInput.style = 'border-color:red'
        }
        else {
            usernameError.innerText = ''
            usernameInput.removeAttribute('style')
        }
        if (passwordInput.value === '') {
            passwordError.innerText = '*Please enter password'
            passwordInput.style = 'border-color:red'
        }
        else {
            passwordError.innerText = ''
            passwordInput.removeAttribute('style')
        }
        if (usernameError.innerText === '' && passwordError.innerText === '') {
            let loginCheck = allUsers.filter((e) => e.username === usernameInput.value)
            if (loginCheck.length) {
                if (loginCheck[0].password === passwordInput.value) {
                    alert('Login Successful')
                    sessionStorage.setItem('userInfo', JSON.stringify(loginCheck))
                    navigate('/home')
                }
                else {
                    passwordError.innerText = '*Incorrect password'
                    passwordInput.style = 'border-color:red'
                }
            }
            else {
                usernameError.innerText = '*Incorrect username'
                usernameInput.style = 'border-color:red'
            }
        }
    }

    function usernameValidate() {
        const usernameInput = document.getElementById('usernameInput')
        const usernameError = document.getElementById('usernameError')
        if (usernameInput.value === '') {
            usernameError.innerText = '*Please enter username'
            usernameInput.style = 'border-color:red'
        }
        else {
            usernameError.innerText = ''
            usernameInput.removeAttribute('style')
        }
    }

    function passwordValidate() {
        const passwordInput = document.getElementById('passwordInput')
        const passwordError = document.getElementById('passwordError')
        if (passwordInput.value === '') {
            passwordError.innerText = '*Please enter username'
            passwordInput.style = 'border-color:red'
        }
        else {
            passwordError.innerText = ''
            passwordInput.removeAttribute('style')
        }
    }

    return (
        <>
            <div className="container col-3 shadow container rounded position-absolute top-50 start-50 translate-middle">
                <h4 className='m-2 text-center text-primary'>Log In</h4>
                <div className='m-2'>
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { usernameValidate() }} />
                    <span className='text-danger' id='usernameError'></span>
                </div>
                <div className='m-2 pb-2'>
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordValidate() }} />
                    <span className='text-danger' id='passwordError'></span>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className="btn btn-outline-success" onClick={() => { loginCkick() }}>Log In</button>
                </div>
                <h6 className='text-center m-2'>new user <span className='text-primary' onClick={() => { navigate('/signup') }}> create an account</span></h6>
                <h6 className='text-center m-2'>forgot password<span className='text-primary' onClick={() => { navigate('/forgot-password') }}> click here</span></h6>
            </div>
        </>
    )
}

export default Login