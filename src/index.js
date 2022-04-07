import React from 'react';
import ReactDOM from 'react-dom';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom"
import './index.css';
import reportWebVitals from './reportWebVitals';
import Transfermarkt from './Transfermarkt';
import Flashscore from './Flashscore';
import FlashscoreClub from './FlashscoreClub';


function Index(){
  return(
    <Router>
      <Routes>
        <Route path={'/'} element= {<div><a href='/flashscore'>Wyniki klubów</a><br /><a href='/transfermarkt'>Wyszukiwanie zawodnika</a></div>} />
        <Route path={'/flashscore'} element= {<Flashscore />} />
        <Route path={'/flashscore/:query'} element= {<FlashscoreClub />} />
        <Route path={'/transfermarkt'} element= {<Transfermarkt />} />
      </Routes>
    </Router>);
}

ReactDOM.render(<Index/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
