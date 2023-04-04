import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Signup() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('https://recipe-wbww.onrender.com/allUsers')
            .then((response) => {
                setAllUsers(response.data)
                // console.log(allUsers);
            });
    }, [allUsers])

    function registerClick() {
        // console.log('registerClick invoked');
        const nameInput = document.getElementById('nameInput')
        const emailInput = document.getElementById('emailInput')
        const usernameInput = document.getElementById('usernameInput')
        const passwordInput = document.getElementById('passwordInput')
        const cPasswordInput = document.getElementById('cPasswordInput')
        const nameError = document.getElementById('nameError')
        const emailError = document.getElementById('emailError')
        const usernameError = document.getElementById('usernameError')
        const passwordError = document.getElementById('passwordError')
        const cPasswordError = document.getElementById('cPasswordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (nameInput.value === '') {
            nameError.innerText = '*Please enter name'
            nameInput.style = 'border-color:red'
        }
        else {
            if (!(isNaN(nameInput.value))) {
                nameError.innerText = '*Please use only characters'
                nameInput.style = 'border-color:red'
            }
            else {
                nameError.innerText = ''
                nameInput.removeAttribute('style')
            }
        }
        if (emailInput.value === '') {
            emailError.innerText = '*Please enter email'
            emailInput.style = 'border-color:red'
        }
        else {
            if (emailInput.value.match(emailPattern)) {
                emailError.innerText = ''
                emailInput.removeAttribute('style')
            }
            else {
                emailError.innerText = '*Please enter a valid email Id'
                emailInput.style = 'border-color:red'
            }
        }
        if (usernameInput.value === '') {
            usernameError.innerText = '*Please enter username'
            usernameInput.style = 'border-color:red'
        }
        else {
            if (!(isNaN(usernameInput.value))) {
                usernameError.innerText = '*Please use only characters'
                usernameInput.style = 'border-color:red'
            }
            else {
                usernameError.innerText = ''
                usernameInput.removeAttribute('style')
            }
        }
        if (passwordInput.value === '') {
            passwordError.innerText = '*Please enter password'
            passwordInput.style = 'border-color:red'
        }
        else {
            if (!(isNaN(passwordInput.value))) {
                passwordError.innerText = '*Please use only characters'
                passwordInput.style = 'border-color:red'
            }
            else {
                passwordError.innerText = ''
                passwordInput.removeAttribute('style')
            }
        }
        if (cPasswordInput.value === '') {
            cPasswordError.innerText = '*Please enter password again'
            cPasswordInput.style = 'border-color:red'

        }
        else {
            cPasswordError.innerText = ''
            cPasswordInput.removeAttribute('style')
        }
        if (nameError.innerText === '' & emailError.innerText === '' && usernameError.innerText === '' && passwordError.innerText === '' && cPasswordError.innerText === '') {
            let emailCheck = allUsers.filter((e) => e.email === emailInput.value)
            let usernameCheck = allUsers.filter((e) => e.username === usernameInput.value)

            if (emailCheck.length || usernameCheck.length) {
                if (emailCheck.length) {
                    emailError.innerText = '*This email Id already exist, use different one'
                    emailInput.style = 'border-color:red'
                }
                else {
                    usernameError.innerText = '*This username already exist, use different one'
                    usernameInput.style = 'border-color:red'
                }
            }
            else {
                const userSignupData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value,
                    mobile: '',
                    address: '',
                    occupation: ''
                }
                axios.post('https://recipe-wbww.onrender.com/userSignUp', userSignupData)
                    .then((response) => {
                        alert('Signup Successful')
                        navigate('/login')
                        // console.log(response.data);
                    });
            }
        }
    }

    function nameValidate() {
        const nameInput = document.getElementById('nameInput')
        const nameError = document.getElementById('nameError')

        if (nameInput.value === '') {
            nameError.innerText = '*Please enter name'
            nameInput.style = 'border-color:red'
        }
        else if (!(isNaN(nameInput.value))) {
            nameError.innerText = '*Please use only characters'
            nameInput.style = 'border-color:red'
        }
        else {
            nameError.innerText = ''
            nameInput.removeAttribute('style')
        }
    }

    function emailValidate() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (emailInput.value === '') {
            emailError.innerText = '*Please enter email'
            emailInput.style = 'border-color:red'
        }
        else if (emailInput.value.match(emailPattern)) {
            emailError.innerText = ''
            emailInput.removeAttribute('style')
        }
        else {
            emailError.innerText = '*Please enter a valid email Id'
            emailInput.style = 'border-color:red'
        }

    }

    function usernameValidate() {
        const usernameInput = document.getElementById('usernameInput')
        const usernameError = document.getElementById('usernameError')

        if (usernameInput.value === '') {
            usernameError.innerText = '*Please enter username'
            usernameInput.style = 'border-color:red'
        }
        else if (!(isNaN(usernameInput.value))) {
            usernameError.innerText = '*Please use only characters'
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
            passwordError.innerText = '*Please enter password'
            passwordInput.style = 'border-color:red'
        }
        else if (!(isNaN(passwordInput.value))) {
            passwordError.innerText = '*Please use only characters'
            passwordInput.style = 'border-color:red'
        }
        else {
            passwordError.innerText = ''
            passwordInput.removeAttribute('style')
        }
    }

    function cPasswordValidate() {
        const cPasswordInput = document.getElementById('cPasswordInput')
        const passwordInput = document.getElementById('passwordInput')
        const cPasswordError = document.getElementById('cPasswordError')

        if (cPasswordInput.value === '') {
            cPasswordError.innerText = '*Please enter password again'
            cPasswordInput.style = 'border-color:red'
        }
        else if (cPasswordInput.value !== passwordInput.value) {
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
                <h4 className='text-center m-2 text-primary'>Sign Up</h4>
                <div className='m-2'>
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { nameValidate() }} />
                    <span id='nameError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="emailInput" className="form-label">Email Id</label>
                    <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { emailValidate() }} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="usernameInput" className="form-label">Username</label>
                    <input type="text" className="form-control" id="usernameInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { usernameValidate() }} />
                    <span id='usernameError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordValidate() }} />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                <div className='m-2'>
                    <label htmlFor="cPasswordInput" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="cPasswordInput" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { cPasswordValidate() }} />
                    <span id='cPasswordError' className='text-danger'></span>
                </div>
                <div className='d-flex justify-content-center m-3'>
                    <button className="btn btn-outline-success" onClick={() => { registerClick() }}>Register</button>
                </div>
                <h6 className='text-center text-primary pb-2' onClick={() => { navigate('/login') }}>back to login</h6>
            </div>
        </>
    )
}

export default Signup