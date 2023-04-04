import React from 'react'
import Navbar from './Navbar'


function ShowRecipe() {
    let showRecipeInfo = JSON.parse(sessionStorage.getItem('showRecipeInfo'))
    return (
        <>
            <Navbar searchBar={false} myProfile={true} logout={true} />
            <div className="container mt-4 ">
                <div className="row d-flex justify-content-center " >
                    <div className="col-5 shadow rounded m-2">
                        <img src={showRecipeInfo.clickedRecipeInfo.imgAddress} className="img-fluid" alt='Recipe' style={{ height: '100%', width: '100%' }}></img>
                    </div>
                    <div className="col-5 shadow rounded m-2">
                        <div className="d-flex justify-content-between">
                            <div className="mt-2">
                                <h4>Recipe name : <span style={{ color: 'purple' }}>{showRecipeInfo.clickedRecipeInfo.name}</span></h4>
                                <h4>Prep time : <span style={{ color: 'purple' }}>{showRecipeInfo.clickedRecipeInfo.prepTime}</span></h4>
                                <h4>Cook time : <span style={{ color: 'purple' }}>{showRecipeInfo.clickedRecipeInfo.cookTime}</span></h4>
                                <h4>Total time : <span style={{ color: 'purple' }}>{showRecipeInfo.clickedRecipeInfo.totalTime}</span></h4>
                                <h4>Description : <span style={{ color: 'purple' }}>{showRecipeInfo.clickedRecipeInfo.description}</span></h4>
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
                            showRecipeInfo.clickedRecipeInfo.ingredients.map((e, i) => {
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
                            showRecipeInfo.clickedRecipeInfo.steps.map((e, i) => {
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

export default ShowRecipe