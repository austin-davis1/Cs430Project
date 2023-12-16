import { useState } from 'react'
import { UploadFile } from './pages/uploadFile'
import { AllFiles } from './pages/AllFiles'
import { AllUsers } from './pages/AllUsers'
import { SingleFile } from './pages/SingleFile'
import { Layout } from './Layout'
import { Landing } from './pages/Landing'
import { UserProfile } from './pages/UserProfile'
import { NewUser } from './pages/NewUser'
import { HashRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/newuser" element={<NewUser/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<AllFiles/>}/>
          <Route path="/file/:id" element={<SingleFile/>}/>
          <Route path="/users" element={<AllUsers/>}/>
          <Route path="/user/:id" element={<UserProfile/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
