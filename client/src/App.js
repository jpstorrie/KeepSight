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

  darkMode ? document.documentElement.setAttribute('data-theme', "luxury"):document.documentElement.setAttribute('data-theme', "bumblebee")

  const toggleDarkMode = ()=>setDarkMode(!darkMode)
  const body = document.querySelector("body")


  useEffect(()=>{
    fetch("/authorized")
      .then(r => {
        if (r.ok) { r.json().then((user => setUser(user))) }
        else { setUser(null) }
      })
  },[])

  const updateUser = (user) => setUser(user)



  // if(errors) return <h1>{errors}</h1>
  if (!user){
    const body = document.querySelector("body")
    body.style.backgroundColor = "#556"
    body.style.backgroundImage = "linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445), linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445), linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445), linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445), linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a), linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a)"
    body.style.size = "80px 140px"

    return (
    <Router>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} user={user} updateUser={updateUser}/>
      <Routes>
      <Route path="/" element={<Login updateUser={updateUser} user={user}/>}/>
      <Route path="/users/new" element={<NewUser updateUser={updateUser} />} />
      </Routes>
    </Router>
  )
}
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
