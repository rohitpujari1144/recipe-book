import React, { useState } from 'react'
import './adminPage.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function AdminPage() {
  let [allUsers, setAllUsers] = useState([])
  let [recipes, setRecipes] = useState([])

  useEffect(() => {
    getAllUsers()
    getAllRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getAllUsers() {
    try {
      let res = await axios.get('https://recipe-wbww.onrender.com/users')
      setAllUsers(res.data)
    }
    catch (error) {
      if (error.response) {
        setAllUsers()
      }
      else {
        errorToastMessage()
      }
    }
  }

  async function getAllRecipes() {
    try {
      let res = await axios.get('https://recipe-wbww.onrender.com/recipes')
      setRecipes(res.data)
    }
    catch (error) {
      if (error.response) {
        errorToastMessage()
      }
      else {
        errorToastMessage()
      }
    }
  }

  async function deleteAccount(email) {
    let confirmation = window.confirm("Are you sure, you want to delete this account?")
    if (confirmation) {
      try {
        await axios.delete(`https://recipe-wbww.onrender.com/users/delete/${email}`)
        getAllUsers()
        successToastMessage('User account successfully deleted')
      }
      catch (error) {
        if (error.response) {
          errorToastMessage()
        }
        else {
          errorToastMessage()
        }
      }
    }
  }

  async function deleteRecipeClick(recipeId) {
    let recipeDeleteConfirmation = window.confirm("Are you sure, you want to delete this recipe?")
    if (recipeDeleteConfirmation) {
      try {
        await axios.delete(`https://recipe-wbww.onrender.com/recipes/delete/${recipeId}`)
        getAllRecipes()
        successToastMessage('Recipe successfully deleted')
      }
      catch (error) {
        if (error.response) {
          errorToastMessage()
        }
        else {
          errorToastMessage()
        }
      }
    }
  }

  function successToastMessage(message) {
    toast.success(message, {
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
      <Navbar logout={true} />
      <div className='adminMainDiv'>
        <div>
          <div>
            <h4>All Users</h4>
          </div>
          <div className='allUsersTableDiv border rounded'>
            <table className="table">
              <thead className='thead'>
                <tr>
                  <th scope="col th">Sr. No.</th>
                  <th scope="col th">Name</th>
                  <th scope="col th">Email address</th>
                  <th scope="col th">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allUsers.length ? allUsers.map((e, i) => {
                    return (<tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td><button className='btn btn-outline-danger btn-sm' onClick={() => deleteAccount(e.email)}><i className="fa-regular fa-trash-can"></i> Delete account</button></td>
                    </tr>)
                  }) : <tr><td>No data</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='mt-5'>
          <h4>All Recipes</h4>
        </div>
        <div className='allRecipesMainDiv border rounded'>
          {
            recipes.length ? recipes.map((e, i) => {
              return (
                <div key={i} className="cardDiv card border-0 shadow">
                  <div className='imageDiv'>
                    <img src={e.imgAddress} className="rounded card-img-top" alt={e.name} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.description}</p>
                  </div>
                  <div className='m-2'>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => { deleteRecipeClick(e.recipeId) }}><i className="fa-regular fa-trash-can"></i> Delete Recipe</button>
                  </div>
                </div>
              )
            }) : <div><h4>No data</h4></div>
          }
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AdminPage