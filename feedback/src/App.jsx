import { useState } from 'react'
import './App.css'
import '../../../web.css'
import logo from '../../../Images/logo.png'
import Summary from './components/summary/Summary.jsx'

function App() {
  return (
    <div className="mainContainer">
      <div className="homeHeader" style={{width: '100%'}}>
        <div className="header-left">
        <img src={logo} className="logo" alt="Logo"/>
        <h1>Feedback Analysis</h1>
      </div>

      <nav className="navigation">
          <ul>
              <li><a href="http://127.0.0.1:5500/index.html">Home</a></li>
              <li><a href="http://127.0.0.1:5500/dining.html">Dining</a></li>
              <li><a href="http://127.0.0.1:5500/housing.html">Housing</a></li>
              <li><a href="http://127.0.0.1:5500/calculator.html">Calculator</a></li>
              <li><a href="http://127.0.0.1:5500/opinion.html">Survey</a></li>
          </ul>
      </nav>
      </div>
      
      <div className="summaryContainer">
        <Summary />
      </div>
        
    </div>
  )
}

export default App
