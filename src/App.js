import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import MyForm from './components/Forms/MyForm'
const App = () => {

 
  return (
    
    <BrowserRouter>
      
      <Routes>
        
        <Route index element={<MyForm/>} />
      </Routes>
      
    </BrowserRouter>

  )
}

export default App