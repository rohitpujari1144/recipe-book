import React from 'react'
import Navbar from '../Navbar/Navbar'
import './showRecipe.css'
import { useNavigate } from 'react-router'

function ShowRecipe() {
    let navigate = useNavigate()
    let recipe = JSON.parse(sessionStorage.getItem('recipe'))

    return (
        <>
            <Navbar home={true} logout={true} myProfile={true} />
            <div className='backButtonDiv'>
                <span onClick={() => navigate('/home')}><i className="fa-solid fa-angles-left"></i> Back</span>
            </div>
            <div className="showRecipeMainDiv">
                <div className='photoInfoDiv'>
                    <div className='recipeImageDiv shadow rounded'>
                        <img className='recipeImage rounded' src={recipe.imgAddress} alt={recipe.name} />
                    </div>
                    <div className='recipeDescDiv shadow rounded'>
                        <h5>Recipe name: {recipe.name}</h5>
                        <h5>Preparation time: {recipe.prepTime}</h5>
                        <h5>Cooking time: {recipe.cookTime}</h5>
                        <h5>Total time: {recipe.totalTime}</h5>
                        <h5>Description: {recipe.description}</h5>
                        <div className='text-end fs-4'>
                            <i className="fa-regular fa-bookmark text-success"></i>
                        </div>

                    </div>
                </div>
                <div className="recipeStepsDiv shadow rounded">
                    <div className='m-2'>
                        <h5>Ingredients:</h5>
                        <ul>
                            {
                                recipe.ingredients.length ? recipe.ingredients.map((e, i) => {
                                    return (<li key={i}>{e.ingredName}</li>)
                                }) : ''
                            }
                        </ul>
                    </div>
                    <div className='m-2'>
                        <h5>Direction:</h5>
                        <ul>
                            {
                                recipe.steps.length ? recipe.steps.map((e, i) => {
                                    return (<li key={i}>{e.step}</li>)
                                }) : ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowRecipe