import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import './home.css'
import axios from 'axios'

function Home() {
    let navigate = useNavigate()
    let [recipes, setRecipes] = useState([])
    let [getSavedRecipes, setSavedRecipes] = useState([])

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

    useEffect(() => {
        axios.get('https://recipe-wbww.onrender.com/allRecipes')
            .then((response) => {
                setRecipes(response.data)
            });
    }, [recipes])

    useEffect(() => {
        axios.get('https://recipe-wbww.onrender.com/allSavedRecipes')
            .then((response) => {
                setSavedRecipes(response.data)
            });
    }, [getSavedRecipes])

    function viewMoreClick(i) {
        sessionStorage.setItem('recipeInfo', JSON.stringify(recipes[i]))
        navigate('/recipe')
    }

    function saveRecipeClick(recipe) {
        let recipeInfo = getSavedRecipes.filter((elem) => elem.clickedRecipeInfo._id === recipe._id)
        if (recipeInfo.length) {
            alert('Recipe already saved')
        }
        else {
            let clickedRecipeInfo = {
                clickedRecipeInfo: recipe,
                userEmail: userInfo[0].email
            }
            axios.post(`https://recipe-wbww.onrender.com/saveRecipe`, clickedRecipeInfo)
                .then((response) => {
                    alert('Recipe Saved')
                });
        }
    }

    return (
        <>
            <Navbar myProfile={true} searchBar={true} logout={true} />

            <div className='container mt-5 d-grid justify-content-center rounded' style={{ gridTemplateColumns: 'auto auto auto auto' }}>
                {recipes.map((e, i) => {
                    return <div key={i} className="card shadow m-4" style={{ width: '18rem', height:'35rem' }}>
                        <div style={{ maxHeight: '260px' }}>
                            <img src={e.imgAddress} alt="Recipe" className="card-img-top" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{e.name}</h5>
                            <p className="card-text">{e.description}</p>
                            <div className='d-flex justify-content-between m-2 position-absolute bottom-0 start-0'>
                                <div className=' '>
                                    <button className="btn btn-primary fs-6 " onClick={() => { viewMoreClick(i) }}>view more</button>
                                </div>
                                <div style={{ marginLeft: '145px' }}>
                                    <i id='saveRecipe' className=" fa-regular fa-bookmark fs-2 text-success" title='save recipe' onClick={() => { saveRecipeClick(e) }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Home