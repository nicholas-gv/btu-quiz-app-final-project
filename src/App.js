import React from "react";
import Home from "./components/Home/Home.jsx"
import Quiz from "./components/Quiz/Quiz.jsx"
import History from "./components/History/History.jsx"
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/history" element={<History/>}/>
        </Routes>
    </Router>
  );
}