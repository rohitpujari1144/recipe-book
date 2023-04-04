import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

function Recipe() {
    const recipeInfo = JSON.parse(sessionStorage.getItem('recipeInfo'))
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    let [getSavedRecipes, setSavedRecipes] = useState([])

    useEffect(() => {
        axios.get('https://recipe-wbww.onrender.com/allSavedRecipes')
            .then((response) => {
                setSavedRecipes(response.data)
            });
    }, [getSavedRecipes])

    function saveRecipe(recipeInfo) {
        let recipe = getSavedRecipes.filter((elem) => elem.clickedRecipeInfo._id === recipeInfo._id)
        if (recipe.length) {
            let clickedRecipeInfo = {
                clickedRecipeInfo: recipeInfo,
                userEmail: userInfo[0].email
            }
            axios.post(`https://recipe-wbww.onrender.com/saveRecipe`, clickedRecipeInfo)
                .then((response) => {
                    alert('Recipe Saved')
                });
        }
        else {
            alert('Recipe already saved')
            
        }

    }

    return (
        <>
            <Navbar searchBar={false} myProfile={true} logout={true} />

            <div className="container mt-4 ">
                <div className="row d-flex justify-content-center " >
                    <div className="col-5 shadow rounded m-2">
                        <img src={recipeInfo.imgAddress} className="img-fluid" alt='Recipe' style={{ height: '100%', width: '100%' }}></img>
                    </div>
                    <div className="col-5 shadow rounded m-2">
                        <div className="d-flex justify-content-between">
                            <div className="mt-2">
                                <h4>Recipe name : <span style={{ color: 'purple' }}>{recipeInfo.name}</span></h4>
                                <h4>Prep time : <span style={{ color: 'purple' }}>{recipeInfo.prepTime}</span></h4>
                                <h4>Cook time : <span style={{ color: 'purple' }}>{recipeInfo.cookTime}</span></h4>
                                <h4>Total time : <span style={{ color: 'purple' }}>{recipeInfo.totalTime}</span></h4>
                                <h4>Description : <span style={{ color: 'purple' }}>{recipeInfo.description}</span></h4>
                            </div>
                            <div className="mt-2">
                                <i id='saveRecipe' className=" fa-regular fa-bookmark fs-2 text-primary" title='save recipe' onClick={() => { saveRecipe(recipeInfo) }}></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-10 mt-4 shadow rounded position-relative bottom-0 start-50 translate-middle-x' >
                    <div>
                        <div className='ms-3 pt-2'>
                            <h5 >Ingredients :</h5>
                        </div>
                        {
                            recipeInfo.ingredients.map((e, i) => {
                                return (
                                    <ul key={i}>
                                        <li>{e.ingredName}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                    <div className='mb-5 pb-2'>
                        <div className='ms-3 pt-2'>
                            <h5>Direction : </h5>
                        </div>
                        {
                            recipeInfo.steps.map((e, i) => {
                                return (
                                    <ul key={i}>
                                        <li>{e.step}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recipe