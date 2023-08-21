import React from 'react'
import './home.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router';

function Home() {
  let navigate = useNavigate()
  let recipes = JSON.parse(sessionStorage.getItem('recipes'))

  function showMoreClick(recipe) {
    sessionStorage.setItem('recipe', JSON.stringify(recipe))
    setTimeout(() => {
      navigate('/recipe')
    }, 500);
  }

  return (
    <>
      <Navbar myProfile={true} logout={true} home={false} />
      <div className="allRecipeMainDiv" style={{ height: '600px', overflow: 'auto' }}>
        {
          recipes.length ? recipes.map((e, i) => {
            return (
              <div key={i} className="cardDiv card border-0 shadow">
                <div className='imageDiv'>
                  <img src={e.imgAddress} className="image rounded card-img-top" alt={e.name} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{e.name}</h5>
                  <p className="card-text">{e.description}</p>
                </div>
                <div className='m-2'>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => showMoreClick(e)}>Let's cook <i className="fa-solid fa-utensils"></i></button>
                </div>
              </div>
            )
          }) : <div><h4>Loading...</h4></div>
        }
      </div>
    </>
  )
}

export default Home