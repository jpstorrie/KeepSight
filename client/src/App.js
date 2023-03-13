import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <Router>
    <div className="App">
      <Routes>
      <Route exact path="/" element={<h1 className="text-3xl font-bold">Page Count: {count}</h1>}/>
      <Route path="/test" element={<h1>Testing</h1>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;