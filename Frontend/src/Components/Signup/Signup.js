import './signup.css'
import React from 'react'
import axios from 'axios'
// import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
// import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
    let count = 0;
    let navigate = useNavigate()

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

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === '') {
            emailError.innerText = "*Required"
        }
        else {
            emailError.innerText = ""
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

    async function registerClick() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
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
        if (email.value === '') {
            emailError.innerText = "*Required"
        }
        else {
            if (email.value.match(emailPattern)) {
                emailError.innerText = ""
            }
            else {
                emailError.innerText = "*Invalid"
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
        if (nameError.innerText === "" && emailError.innerText === "" && passwordError.innerText === "" && securityCodeError.innerText === "") {
            let userSignupDetails = {
                name: name.value,
                email: email.value,
                password: password.value,
                securityCode: securityCode.value,
                savedRecipes: []
            }
            try {
                await axios.post('https://recipe-wbww.onrender.com/users/signup', userSignupDetails)
                successToastMessage()
                setTimeout(() => {
                    navigate('/')
                }, 3500);
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        warnToastMessage()
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

    // const response = async (res) => {
    //     let password = '';
    //     let userObject = jwtDecode(res.credential);
    //     let signupError = document.getElementById('signupError');
    //     await axios.get(`https://recipe-wbww.onrender.com/login?email=${userObject.email}&password=${password}`)
    //         .then((res) => {
    //             if (res.data.message === "Login Successful") {
    //                 signupError.innerText = "*Email address already exist"
    //                 setTimeout(() => {
    //                     signupError.innerText = ""
    //                 }, 3000);
    //             }
    //             else {
    //                 var userId = 1;
    //                 if (allUsers.length) {
    //                     userId = allUsers[0].userId + 1
    //                 }
    //                 let userSignupDetails = {
    //                     userId: userId,
    //                     name: userObject.name,
    //                     email: userObject.email
    //                 }
    //                 async function userSignup() {
    //                     await axios.post('https://recipe-wbww.onrender.com/signup', userSignupDetails)
    //                         .then((res) => {
    //                             setOpen(true)
    //                             setTimeout(() => {
    //                                 navigate('/')
    //                             }, 2500);
    //                         })
    //                         .catch((error) => {
    //                             console.log(error);
    //                         })
    //                 }
    //                 userSignup()
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    // const error = (error) => {
    //     console.log(error)
    // }

    function successToastMessage() {
        toast.success('Signup successful', {
            position: "bottom-left",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    function warnToastMessage() {
        toast.warn('Email address already exist !', {
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
            <div className="mainSignupDiv shadow rounded">
                <div className='text-center'>
                    <h3 className='text-primary'>Sign Up</h3>
                </div>
                <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => nameValidate()} />
                    <span id='nameError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => emailValidate()} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => passwordValidate()} />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="securityCode" className="form-label">Account security code</label>
                    <input type="password" className="form-control" id="securityCode" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => securityCodeValidate()} />
                    <span id='securityCodeError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => showPasswordClick()} /> Show password & security code
                </div>
                <div className='text-center mt-2'>
                    <span className="text-danger" id='signupError'></span>
                    <button type="button" className="btn btn-outline-primary mt-2" onClick={() => { registerClick() }}>Register</button>
                    {/* <div className="" style={{ width: 'fit-content', marginLeft: '65px', marginTop: '10px' }}>
                        <GoogleLogin onSuccess={response} onError={error} />
                    </div> */}
                    <h6 className='mt-2 hoverText text-primary' onClick={() => { navigate('/') }}>back to login</h6>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Signup