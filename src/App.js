import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Admin from './screens/Admin';
import Event from './screens/Event';
import './style/App.css'
import Error from './screens/Error';

function App() {
  const isLoggedIn = window.localStorage.getItem('isLogged');
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ isLoggedIn ? <Home/> : <Login/> } />
          <Route path='/login' element={ <Login/> } />
          <Route path='/signup' element={ <Signup/> } />
          <Route path='/home' element={ <Home/> } />
          <Route path='/profile' element={ <Profile/> } />
          <Route path='/admin' element={ <Admin/> } />
          <Route path='/event' element={ <Event/> } />
          <Route path='/error' element={ <Error/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
