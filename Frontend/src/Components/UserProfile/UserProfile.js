import React from 'react'
import './userProfile.css'
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function UserProfile() {
    let navigate = useNavigate()
    let count = 0;
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    let token = JSON.parse(sessionStorage.getItem('token'));
    let auth = {
        headers: { Authorization: `Bearer ${token}` }
    }

    function editClick() {
        const name = document.getElementById('name')
        const securityCode = document.getElementById('securityCode')
        const password = document.getElementById('password')
        name.removeAttribute('readOnly')
        securityCode.removeAttribute('readOnly')
        password.removeAttribute('readOnly')
    }

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else {
            nameError.innerText = ""

        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === '') {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ""

        }
    }

    function securityCodeValidate() {
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        if (securityCode.value === '') {
            securityCodeError.innerText = "*Required"
        }
        else {
            securityCodeError.innerText = ""

        }
    }

    async function submitClick() {
        const name = document.getElementById('name')
        const email = document.getElementById('email')
        const nameError = document.getElementById('nameError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else {
            if (!isNaN(name.value)) {
                nameError.innerText = "*Invalid"
            }
            else {
                nameError.innerText = ""
            }
        }
        if (password.value === '') {
            passwordError.innerText = "*Required"
        }
        else {
            if (password.value.length < 6) {
                passwordError.innerText = "*Password should be greater than 5 characters"
            }
            else {
                passwordError.innerText = ""
            }
        }
        if (securityCode.value === '') {
            securityCodeError.innerText = "*Required"
        }
        else {
            if (securityCode.value.length < 6) {
                securityCodeError.innerText = "*security code should be greater than 5 characters"
            }
            else {
                securityCodeError.innerText = ""
            }
        }
        if (nameError.innerText === "" && passwordError.innerText === "" && securityCodeError.innerText === "") {
            let newData = {
                name: name.value,
                email: email.value,
                password: password.value,
                securityCode: securityCode.value
            }
            try {
                await axios.put(`https://recipe-wbww.onrender.com/users/update/${userData.email}`, newData, auth)
                sessionStorage.setItem('userData', JSON.stringify(newData))
                successToastMessage('Profile successfully updated')
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        warnToast('Session expired. Please login again')
                        setTimeout(() => {
                            navigate('/')
                            sessionStorage.clear()
                        }, 3500);
                    }
                }
                else {
                    errorToastMessage()
                }
            }
        }
    }

    async function deleteAccount() {
        let confirmation = window.confirm("Are you sure, you want to delete your account?")
        if (confirmation) {
            try {
                await axios.delete(`https://recipe-wbww.onrender.com/users/delete/${userData.email}`, auth)
                successToastMessage('Account successfully deleted')
                setTimeout(() => {
                    navigate('/')
                }, 4000);
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        warnToast('Session expired. Please login again')
                        setTimeout(() => {
                            navigate('/')
                            sessionStorage.clear()
                        }, 3500);
                    }
                }
                else {
                    errorToastMessage()
                }
            }
        }
    }

    function showPasswordClick() {
        const password = document.getElementById('password');
        const securityCode = document.getElementById('securityCode');
        count++;
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
            securityCode.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
            securityCode.removeAttribute('type')
        }
    }

    function successToastMessage(message) {
        toast.success(message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    function warnToast(message) {
        toast.warn(message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    function errorToastMessage() {
        toast.error('Something went wrong. Please try again !', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <>
            <Navbar home={true} profile={false} logout={true} />
            <div className='userProfileDiv border rounded'>
                <h5>Profile</h5>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" defaultValue={userData.name} readOnly onKeyUp={() => nameValidate()} />
                    <span className='text-danger' id="nameError"></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={userData.email} readOnly />
                    <span className='text-danger' id='emailError'></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" defaultValue={userData.password} readOnly onKeyUp={() => passwordValidate()} />
                    <span className='text-danger' id='passwordError'></span>
                </div>
                <div className="mb-3">
                    <label htmlFor="securityCode" className="form-label">Account security code</label>
                    <input type="password" className="form-control" id="securityCode" aria-describedby="emailHelp" defaultValue={userData.securityCode} readOnly onKeyUp={() => securityCodeValidate()} />
                    <span className='text-danger' id='securityCodeError'></span>
                </div>
                <div className='mb-3'>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => showPasswordClick()} /> Show password & security code
                </div>
                <div className='' style={{ display: 'flex', gridGap: '10px' }}>
                    <button className='btn btn-outline-primary btn-sm' onClick={() => editClick()}><i className="fa-regular fa-pen-to-square"></i> Edit</button><button id='submitButton' className='btn btn-outline-success btn-sm' onClick={() => submitClick()}><i className="fa-solid fa-check"></i> Submit</button><button id='submitButton' className='btn btn-outline-danger btn-sm' onClick={() => deleteAccount()}><i className="fa-regular fa-trash-can"></i> Delete account</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UserProfile