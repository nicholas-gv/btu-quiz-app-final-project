import React from "react";
import Home from "./components/Home/Home.jsx"
import Quiz from "./components/Quiz/Quiz.jsx"
import History from "./components/History/History.jsx"
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/quiz" element={<Quiz/>}/>
            <Route path="/history" element={<History/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;