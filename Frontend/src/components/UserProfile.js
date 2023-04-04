import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function UserProfile() {
    let navigate = useNavigate()
    let [getSavedRecipe, setGetSavedRecipe] = useState([])
    let [getAllUsers, setGetAllUsers] = useState([])

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    useEffect(() => {
        axios.get(`https://recipe-wbww.onrender.com/getRecipe/${userInfo[0].email}`)
            .then((response) => {
                setGetSavedRecipe(response.data)
            });
    }, [getSavedRecipe])

    useEffect(() => {
        axios.get(`https://recipe-wbww.onrender.com/allUsers`)
            .then((response) => {
                setGetAllUsers(response.data)
            });
    }, [getAllUsers])


    function editClick() {
        const nameInput = document.getElementById('nameInput')
        const addressInput = document.getElementById('addressInput')
        const mobileInput = document.getElementById('mobileInput')
        const occupationInput = document.getElementById('occupationInput')
        const updateButton = document.getElementById('updateButton')
        nameInput.removeAttribute('readOnly')
        addressInput.removeAttribute('readOnly')
        mobileInput.removeAttribute('readOnly')
        occupationInput.removeAttribute('readOnly')
        updateButton.removeAttribute('disabled')
    }

    function updateClick() {
        const nameInput = document.getElementById('nameInput')
        const nameError = document.getElementById('nameError')
        const emailInput = document.getElementById('emailInput')
        const addressInput = document.getElementById('addressInput')
        const addressError = document.getElementById('addressError')
        const mobileInput = document.getElementById('mobileInput')
        const mobileError = document.getElementById('mobileError')
        const occupationInput = document.getElementById('occupationInput')
        const occupationError = document.getElementById('occupationError')
        const updateButton = document.getElementById('updateButton')

        if (nameInput.value === '') {
            nameInput.style = 'border-color:red'
            nameError.innerText = '*Please enter name'
        }
        else {
            if (!isNaN(nameInput.value)) {
                nameInput.style = 'border-color:red'
                nameError.innerText = '*Please use only characters'
            }
            else {
                nameInput.removeAttribute('style')
                nameError.innerText = ''
            }
        }
        if (addressInput.value === '') {
            addressInput.style = 'border-color:red'
            addressError.innerText = '*Please enter address'
        }
        else {
            addressInput.removeAttribute('style')
            addressError.innerText = ''
        }
        if (mobileInput.value === '') {
            mobileInput.style = 'border-color:red'
            mobileError.innerText = '*Please enter mobile number'
        }
        else {
            if (isNaN(mobileInput.value)) {
                mobileInput.style = 'border-color:red'
                mobileError.innerText = '*Please use only number'
            }
            else if (mobileInput.value.length < 10 || mobileInput.value.length > 10) {
                mobileInput.style = 'border-color:red'
                mobileError.innerText = '*Mobile number should be of 10 digits'
            }
            else {
                mobileInput.removeAttribute('style')
                mobileError.innerText = ''
            }
        }
        if (occupationInput.value === '') {
            occupationInput.style = 'border-color:red'
            occupationError.innerText = '*Please enter occupation'
        }
        else {
            if (!isNaN(occupationInput.value)) {
                occupationInput.style = 'border-color:red'
                occupationError.innerText = '*Please use only characters'
            }
            else {
                occupationInput.removeAttribute('style')
                occupationError.innerText = ''
            }
        }
        if (nameError.innerText === '' && mobileError.innerText === '' && addressError.innerText === '' && occupationError.innerText === '') {
            let userUpdatedData = {
                name: nameInput.value,
                address: addressInput.value,
                mobile: mobileInput.value,
                occupation: occupationInput.value
            }
            axios.put(`https://recipe-wbww.onrender.com/updateUser/${userInfo[0].email}`, userUpdatedData)
                .then((response) => {
                    alert('Profile updated successfully')
                    sessionStorage.removeItem('userInfo')
                    let user = getAllUsers.filter((elem) => elem.email === emailInput.value)
                    sessionStorage.setItem('userInfo', JSON.stringify(user))
                });
            nameInput.setAttribute('readOnly', true)
            addressInput.setAttribute('readOnly', true)
            mobileInput.setAttribute('readOnly', true)
            occupationInput.setAttribute('readOnly', true)
            updateButton.setAttribute('disabled', true)
        }
    }

    function nameValidate() {
        const nameInput = document.getElementById('nameInput')
        const nameError = document.getElementById('nameError')
        if (nameInput.value === '') {
            nameInput.style = 'border-color:red'
            nameError.innerText = '*Please enter name'
        }
        else if (!isNaN(nameInput.value)) {
            nameInput.style = 'border-color:red'
            nameError.innerText = '*Please use only characters'
        }
        else {
            nameInput.removeAttribute('style')
            nameError.innerText = ''
        }
    }

    function addressValidate() {
        const addressInput = document.getElementById('addressInput')
        const addressError = document.getElementById('addressError')
        if (addressInput.value === '') {
            addressInput.style = 'border-color:red'
            addressError.innerText = '*Please enter address'
        }
        else {
            addressInput.removeAttribute('style')
            addressError.innerText = ''
        }
    }

    function mobileValidate() {
        const mobileInput = document.getElementById('mobileInput')
        const mobileError = document.getElementById('mobileError')
        if (mobileInput.value === '') {
            mobileInput.style = 'border-color:red'
            mobileError.innerText = '*Please enter mobile number'
        }
        else if (isNaN(mobileInput.value)) {
            mobileInput.style = 'border-color:red'
            mobileError.innerText = '*Please use only number'
        }
        else {
            mobileInput.removeAttribute('style')
            mobileError.innerText = ''
        }
    }

    function occupationValidate() {
        const occupationInput = document.getElementById('occupationInput')
        const occupationError = document.getElementById('occupationError')
        if (occupationInput.value === '') {
            occupationInput.style = 'border-color:red'
            occupationError.innerText = '*Please enter occupation'
        }
        else if (!isNaN(occupationInput.value)) {
            occupationInput.style = 'border-color:red'
            occupationError.innerText = '*Please use only characters'
        }
        else {
            occupationInput.removeAttribute('style')
            occupationError.innerText = ''
        }
    }

    function viewMoreClick(i) {
        sessionStorage.setItem('showRecipeInfo', JSON.stringify(getSavedRecipe[i]))
        navigate('/show-recipe')
    }
    return (
        <>
            <Navbar searchBar={false} myProfile={false} logout={true} />

            <div className="container-fluid ">
                {/* user profile div start */}
                <div className="container col-4 border border-dark rounded position-relative top-0 start-0 ms-2" style={{ marginTop: '30px' }}>
                    <h4 className=' mt-2'>Your Profile</h4>
                    <div className='m-2'>
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input type="text" className="form-control" id="nameInput" aria-describedby="emailHelp" defaultValue={userInfo[0].name} onKeyUp={() => { nameValidate() }} readOnly />
                        <span id="nameError" className='text-danger'></span>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="emailInput" className="form-label">Email Id</label>
                        <input type="text" className="form-control" id="emailInput" aria-describedby="emailHelp" defaultValue={userInfo[0].email} readOnly />
                    </div>
                    <div className='m-2'>
                        <label htmlFor="addressInput" className="form-label">Address</label>
                        <input type="text" className="form-control" id="addressInput" aria-describedby="emailHelp" defaultValue={userInfo[0].address} onKeyUp={() => { addressValidate() }} readOnly />
                        <span id="addressError" className='text-danger'></span>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="mobileInput" className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" id="mobileInput" aria-describedby="emailHelp" defaultValue={userInfo[0].mobile} onKeyUp={() => { mobileValidate() }} readOnly />
                        <span id="mobileError" className='text-danger'></span>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="occupationInput" className="form-label">Occupation</label>
                        <input type="text" className="form-control" id="occupationInput" aria-describedby="emailHelp" defaultValue={userInfo[0].occupation} onKeyUp={() => { occupationValidate() }} readOnly />
                        <span id="occupationError" className='text-danger'></span>
                    </div>
                    <div className="d-grid gap-2 d-md-block mb-2  text-center">
                        <button className="btn btn-outline-warning m-2" onClick={() => { editClick() }}><i className="fa-solid fa-pencil"></i> Edit</button>
                        <button className="btn btn-outline-success m-2" id='updateButton' onClick={() => { updateClick() }}><i className="fa-solid fa-check"></i> Update</button>
                    </div>
                </div>
                {/* user profile div end */}
                {/* saved recipes start */}
                <div className='m-2 mt-4'>
                    <h4>Saved Recipes :</h4>
                </div>
                <div className="container-fluid d-grid justify-content-start  rounded" style={{ gridTemplateColumns: 'auto auto auto auto' }}>
                    {
                        getSavedRecipe.map((e, i) => {
                            return (<div key={i} className="card m-4 shadow" style={{ width: '18rem', height:'35rem' }} >
                                <div style={{ maxHeight: '260px' }}>
                                    <img src={e.clickedRecipeInfo.imgAddress} alt="Recipe" className="card-img-top" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{e.clickedRecipeInfo.name}</h5>
                                    <p className="card-text">{e.clickedRecipeInfo.description}</p>
                                    <div className='d-flex justify-content-between m-2 position-absolute bottom-0 start-0'>
                                        <div className=' '>
                                            <button className="btn btn-primary fs-6" onClick={() => { viewMoreClick(i) }}>view more</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)

                        })
                    }
                </div>
                {/* saved recipes end */}
            </div>
        </>
    )
}

export default UserProfile