import React from 'react'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
      </Route>
    </Routes>
    </>
  )
}

export default App