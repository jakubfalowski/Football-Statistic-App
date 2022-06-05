import ReactDOM from 'react-dom';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom"
import {PlayerSearch} from '@statistic-app/web/data-access-transfermarket'
import {ClubResults, ClubIndex, MatchStatistic, ClubAll, MatchPrediction, PageIndex, PredictionInfo} from '@statistic-app/web/data-access-flashscore'


function Index(){
  return(
    <Router>
      <Routes>
        <Route path={'/transfermarkt'} element= {<PlayerSearch />} />
        <Route path={"/statistic/:matchID"} element ={<MatchStatistic matchID="KWLYpDWA"/>} />
        <Route path={"/main"} element ={<PageIndex />} />
        <Route path={"/results/:match/:home/:away"} element ={<ClubAll/>} />
        <Route path={"/results/:match/:home/:away/info"} element ={<div>aaaa dkoakea<PredictionInfo/></div>} />
      </Routes>
    </Router>);
}

ReactDOM.render(<Index/>,document.getElementById('root'));

export default Index