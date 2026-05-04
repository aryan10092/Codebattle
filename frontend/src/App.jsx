import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Joinroom from './pages/Joinroom'
import BattleRoom from './pages/BattleRoom'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'

function App() {
  

  return (
    <>
     <Toaster position='top-center'/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/join' element={
        <ProtectedRoute>
          <Joinroom/>
        </ProtectedRoute>
        }/>
      <Route path='/room/:roomid' element={
        <ProtectedRoute>
           <BattleRoom/>
        </ProtectedRoute>
       }/>
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
       }/>
    </Routes>
    </>
  )
}

export default App
