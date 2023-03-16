import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Navbar from "./components/Navbar"


function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // fetch("/authorized")
  // .then(r => {
  //   if(r.ok){
  //   }
  // })

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login />}/>
      <Route exact path="/" element={<h1 className="text-3xl font-bold">Page Count: {count}</h1>}/>
      <Route path="/test" element={<h1>Testing</h1>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;