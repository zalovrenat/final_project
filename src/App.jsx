import React, { useState } from 'react'
import Navbar from './Navbar'
import Signup from './Signup'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddExpense from './AddExpense'
import ViewExpenses from './ViewExpenses'
import MainPage from './MainPage'

const App = () => {

  const [user, setUser] = useState({})

  return (
      <BrowserRouter>

        <div className="App">
          <Navbar setUser={setUser} user={user}/>
          <Routes>
            <Route path='/login' element={<Login setUser={setUser} user={user} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/addExpense' element={<AddExpense user={user} />} />
            <Route path='/viewExpenses' element={<ViewExpenses user={user} />} />
            <Route path='/main' element={<MainPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App