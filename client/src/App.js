import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Children from "./components/Children"
import ChildPage from "./components/ChildPage"
import NewUser from "./components/NewUser"


export default function App() {
  const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  const [darkMode, setDarkMode] = useState(isSystemDark);
  const [user, setUser] = useState(null);

  darkMode? document.documentElement.setAttribute('data-theme', "luxury"):document.documentElement.setAttribute('data-theme', "bumblebee")

  const toggleDarkMode = ()=>setDarkMode(!darkMode)



  useEffect(()=>{
    fetch("/authorized")
      .then(r => {
        if (r.ok) { r.json().then((user => setUser(user))) }
        else { setUser(null) }
      })
  },[])

  const updateUser = (user) => setUser(user)



  // if(errors) return <h1>{errors}</h1>
  if (!user) return (
    <Router>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} user={user} updateUser={updateUser}/>
      <Login updateUser={updateUser}  user={user}/>
    </Router>
  )
  return (
    <Router>
      <div className="App">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} user={user} updateUser={updateUser}/>

        <Routes>
          <Route path="/login" element={<Login updateUser={updateUser} user={user} />} />
          <Route path="/users/new" element={<NewUser />} />
          <Route exact path="/" element={<Children user={user}/>} />
          <Route exact path="/children/:id" element={<ChildPage/>} />
        </Routes>
      </div>
    </Router>
  );
}
