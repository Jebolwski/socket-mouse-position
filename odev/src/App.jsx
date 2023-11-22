import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { useState } from "react";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/lobby" element={<Index />}/>
        </Routes>
      </Router> 
    </>
  )
}

export default App
