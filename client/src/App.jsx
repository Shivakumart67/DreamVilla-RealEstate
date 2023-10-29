import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Header from './Components/Header'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/signin' element = {<Signin/>} />
          <Route path='/signup' element = {<Signup/>} />
          <Route path='/about' element = {<About/>} />
          <Route path='/profile' element = {<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
