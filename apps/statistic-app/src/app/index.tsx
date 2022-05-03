import ReactDOM from 'react-dom';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom"
import {PlayerSearch} from '@statistic-app/web/data-access-transfermarket'
import {ClubResults, ClubIndex, MatchStatistic} from '@statistic-app/web/data-access-flashscore'


function Index(){
  return(
    <Router>
      <Routes>
        <Route path={'/'} element= {<div><a href='/flashscore'>Wyniki klubów</a><br /><a href='/transfermarkt'>Wyszukiwanie zawodnika</a></div>} />
        <Route path={'/flashscore'} element= {<ClubIndex />} />
        <Route path={'/flashscore/:query'} element= {<ClubResults />} />
        <Route path={'/transfermarkt'} element= {<PlayerSearch />} />
        <Route path={"/statistic"} element ={<MatchStatistic />} />
      </Routes>
    </Router>);
}

ReactDOM.render(<Index/>,document.getElementById('root'));

export default Index