import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import Recipe from './components/Recipe';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import ShowRecipe from './components/ShowRecipe';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element=<Login /> />
          <Route path='/home' element=<Home /> />
          <Route path='/recipe' element=<Recipe /> />
          <Route path='/show-recipe' element=<ShowRecipe /> />
          <Route path='/login' element=<Login /> />
          <Route path='/signup' element=<Signup /> />
          <Route path='/forgot-password' element=<ForgotPassword /> />
          <Route path='user-profile' element=<UserProfile /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
