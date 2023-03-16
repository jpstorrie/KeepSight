import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Children from "./components/Children"
import NewUser from "./components/NewUser"


export default function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  document.documentElement.setAttribute('data-theme', isDarkMode);



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
      <Navbar setDarkMode={setIsDarkMode} user={user} updateUser={updateUser}/>
      <Login updateUser={updateUser} />
    </Router>
  )
  return (
    <Router>
      <div className="App">
        <Navbar user={user} setDarkMode={setIsDarkMode} updateUser={updateUser}/>

        <Routes>
          <Route path="/login" element={<Login updateUser={updateUser} />} />
          <Route exact path="/" element={<Children />} />
          <Route exact path="/" element={<Children />} />
          <Route path="/users/new" element={<NewUser />} />
        </Routes>
      </div>
    </Router>
  );
}
