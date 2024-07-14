import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./routes/Home";

function App() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/about', { state: { message: 'Hello from Parent!' } });
  };

  return (
    <Router>
      <div className="App">
        <button onClick={handleNavigate}>Go to Child</button>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
