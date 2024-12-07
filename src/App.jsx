import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './comp/Home'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
