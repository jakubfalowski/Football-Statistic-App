import ReactDOM from 'react-dom';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom"
import {PlayerSearch} from '@statistic-app/web/data-access-transfermarket'
import {ClubResults, ClubIndex, MatchStatistic, ClubAll, MatchPrediction, PageIndex} from '@statistic-app/web/data-access-flashscore'


function Index(){
  return(
    <Router>
      <Routes>
        <Route path={'/'} element= {<div><a href='/prediction'>Wyniki klubów</a><br /><a href='/transfermarkt'>Wyszukiwanie zawodnika</a><br /><a href='/statistic'>Statystyki</a></div>} />
        <Route path={'/flashscore'} element= {<ClubIndex />} />
        <Route path={'/flashscore/:query'} element= {<ClubResults />} />
        <Route path={'/transfermarkt'} element= {<PlayerSearch />} />
        <Route path={"/statistic/:matchID"} element ={<MatchStatistic matchID="KWLYpDWA"/>} />
        <Route path={"/prediction"} element ={<ClubAll/>} />
        <Route path={"/main"} element ={<PageIndex />} />
        <Route path={"/results/:match/:home/:away"} element ={<ClubAll/>} />
      </Routes>
    </Router>);
}

ReactDOM.render(<Index/>,document.getElementById('root'));

export default Index