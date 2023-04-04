import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('https://recipe-wbww.onrender.com/allUsers')
            .then((response) => {
                setAllUsers(response.data)
                console.log(allUsers);
            });
    }, [allUsers])

    function changePasswordClick() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        const otpInput = document.getElementById('otpInput')
        const otpError = document.getElementById('otpError')
        const newPasswordInput = document.getElementById('newPasswordInput')
        const newPasswordError = document.getElementById('newPasswordError')
        const cPasswordInput = document.getElementById('cPasswordInput')
        const cPasswordError = document.getElementById('cPasswordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (emailInput.value === '') {
            emailError.innerText = '*Please enter email id'
            emailInput.style = 'border-color:red'
        }
        else {
            if (emailInput.value.match(emailPattern)) {
                emailError.innerText = ''
                emailInput.removeAttribute('style')
            }
            else {
                emailError.innerText = '*Please enter a valid email id'
                emailInput.style = 'border-color:red'
            }
        }
        if (otpInput.value === '') {
            otpError.innerText = '*Please enter OTP'
            otpInput.style = 'border-color:red'
        }
        else {
            if (isNaN(otpInput.value)) {
                otpError.innerText = '*Please use only numbers'
                otpInput.style = 'border-color:red'
            }
            else {
                otpError.innerText = ''
                otpInput.removeAttribute('style')
            }
        }
        if (newPasswordInput.value === '') {
            newPasswordError.innerText = '*Please enter new password'
            newPasswordInput.style = 'border-color:red'
        }
        else {
            if (!(isNaN(newPasswordInput.value))) {
                newPasswordError.innerText = '*Please use only characters'
                newPasswordInput.style = 'border-color:red'
            }
            else {
                newPasswordError.innerText = ''
                newPasswordInput.removeAttribute('style')
            }
        }
        if (cPasswordInput.value === '') {
            cPasswordError.innerText = '*Please enter new password again'
            cPasswordInput.style = 'border-color:red'
        }
        else {
            if (cPasswordInput.value!==newPasswordInput.value) {
                cPasswordError.innerText = '*Please should be matched'
                cPasswordInput.style = 'border-color:red'
            }
            else {
                cPasswordError.innerText = ''
                cPasswordInput.removeAttribute('style')
            }
        }
        if (emailError.innerText === '' && otpError.innerText === '' && newPasswordError.innerText === '' && cPasswordError.innerText === '') {
            let newPassword = {
                password: newPasswordInput.value
            }
            let emailCheck = allUsers.filter((e) => e.email === emailInput.value)
            if (emailCheck.length) {
                axios.put(`https://recipe-wbww.onrender.com/updateUser/${emailInput.value}`, newPassword)
                    .then((response) => {
                        alert('Password changed successfully')
                        navigate('/login')
                        console.log(response.data);
                    });
            }
            else {
                emailError.innerText = '*Email Id not exist'
                emailInput.style = 'border-color:red'
            }
        }
    }

    function emailValidate() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (emailInput.value === '') {
            emailError.innerText = '*Please enter email id'
            emailInput.style = 'border-color:red'
        }
        else if (emailInput.value.match(emailPattern)) {
            emailError.innerText = ''
            emailInput.removeAttribute('style')
        }
        else {
            emailError.innerText = '*Please enter a valid email id'
            emailInput.style = 'border-color:red'
        }
    }

    function otpValidate() {
        const otpInput = document.getElementById('otpInput')
        const otpError = document.getElementById('otpError')

        if (otpInput.value === '') {
            otpError.innerText = '*Please enter OTP'
            otpInput.style = 'border-color:red'
        }
        else if (isNaN(otpInput.value)) {
            otpError.innerText = '*Please use only numbers'
            otpInput.style = 'border-color:red'
        }
        else {
            otpError.innerText = ''
            otpInput.removeAttribute('style')
        }
    }

    function newPasswordValidate() {
        const newPasswordInput = document.getElementById('newPasswordInput')
        const newPasswordError = document.getElementById('newPasswordError')
        if (newPasswordInput.value === '') {
            newPasswordError.innerText = '*Please enter new password'
            newPasswordInput.style = 'border-color:red'
        }
        else if (!(isNaN(newPasswordInput.value))) {
            newPasswordError.innerText = '*Please use only characters'
            newPasswordInput.style = 'border-color:red'
        }
        else {
            newPasswordError.innerText = ''
            newPasswordInput.removeAttribute('style')
        }
    }

    function cPasswordValidate() {
        const cPasswordInput = document.getElementById('cPasswordInput')
        const cPasswordError = document.getElementById('cPasswordError')
        const newPasswordInput = document.getElementById('newPasswordInput')

        if (cPasswordInput.value === '') {
            cPasswordError.innerText = '*Please enter new password again'
            cPasswordInput.style = 'border-color:red'
        }
        else if (cPasswordInput.value!==newPasswordInput.value) {
            cPasswordError.innerText = '*Password should be matched'
            cPasswordInput.style = 'border-color:red'
        }
        else {
            cPasswordError.innerText = ''
            cPasswordInput.removeAttribute('style')
        }
    }
    return (
        <>
            <div className="container col-3 shadow rounded position-absolute top-50 start-50 translate-middle">
                <h4 className='text-center m-2 text-primary'>Change Password</h4>
                <div className='m-2'>
                    <label htmlFor="emailInput" className="form-label">Email Id</label>
                    <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { emailValidate() }} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="otpInput" className="form-label">OTP</label>
                    <input type="email" className="form-control" id="otpInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { otpValidate() }} />
                    <span id='otpError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="newPasswordInput" className="form-label">New password</label>
                    <input type="password" className="form-control" id="newPasswordInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { newPasswordValidate() }} />
                    <span id='newPasswordError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="cPasswordInput" className="form-label">Confirm new password</label>
                    <input type="password" className="form-control" id="cPasswordInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { cPasswordValidate() }} />
                    <span id='cPasswordError' className='text-danger'></span>
                </div>
                <div className='d-flex justify-content-center m-3'>
                    <button className="btn btn-outline-success" onClick={() => { changePasswordClick() }}>Change Password</button>
                </div>
                <h6 className='text-center pb-2 text-primary' onClick={() => { navigate('/login') }}>back to login</h6>
            </div>
        </>
    )
}

export default ForgotPassword