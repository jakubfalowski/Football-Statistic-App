import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MatchStatistic from "./matchStatistic";
import { calculate1x2 } from "./calculate1x2";

const key1 = '1941a7725amshe72888a2f321827p18582bjsnddf354460ab2'
const key2 = '35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
    'X-RapidAPI-Key': key2
  }
};

export function ClubsResults(props){
  // const {query} = useParams();
    const [clubs, setClubs] = useState([]);
    // const [winHomePercent, setWinHomePercent] = useState();
    // const [drawPercent, setDrawPercent] = useState();
    // const [winAwayPercent, setWinAwayPercent] = useState();
    let Home;
    let Away;
    let teamValue = 0;
    let homeValue = 0; 
    let awayValue = 0;
    let homeMatches = [];
    let awayMatches = [];
    let multiplier = 1;
    let ifFetch = true;
    let changeQuery = false;

      ClubResults(props.home)
      ClubResults(props.away)

    function ClubResults(query){
      async function fetchData() {
        const response = await fetch(
          `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${query}&locale=en_GB&page=1`,options
        );
        const data = await response.json();
        const results = data.DATA[0].EVENTS;
        setClubs(results);
      }
      
      useEffect(() => {
        fetchData();
      }, [ifFetch]);

      function teamStrength(){
        if(changeQuery===true){
          teamValue = 0;
          homeValue = 0; 
          awayValue = 0;
          homeMatches = [];
          awayMatches = [];
          multiplier = 1;
        }

        clubs.slice(clubs.length-15, clubs.length).map((item, lastMatches) => {
          if(lastMatches < 5) multiplier = 0.75
          else if(lastMatches < 10) multiplier = 1
          else multiplier = 1.25

          if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) teamValue += (1*multiplier);
          if(item.HOME_PARTICIPANT_IDS[0]===query){
            if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
            homeMatches.push(item)
          }
          else{
            if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
            awayMatches.push(item)
          }
        })
      
        homeMatches.slice(homeMatches.length-5,homeMatches.length).map(item =>{
          if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) homeValue += 1;
          if(item.HOME_PARTICIPANT_IDS[0]===query){
            if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) homeValue += 3;
          }
          else{
            if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) homeValue += 3;
          }
        })

        awayMatches.slice(awayMatches.length-5,awayMatches.length).map(item =>{
          if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) awayValue += 1;
          if(item.AWAY_PARTICIPANT_IDS[0]===query){
            if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) awayValue += 3;
          }
          else{
            if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) awayValue += 3;
          }
        })
        if(query===props.home){
          Home = teamValue+homeValue
          changeQuery = true;
        }
  
        else if(query===props.away){
          Away = teamValue+awayValue;
          changeQuery = false
        }
    }

    if(clubs !== undefined) teamStrength();
    
  }
    return(
        <div>
            <p>Home: {Home}, {Math.round(Home/(Home+Away)*100)}%, </p>
            <p>Away: {Away}, {Math.round(Away/(Home+Away)*100)}%, </p>
            <table>
              <tr>
                <th>1</th>
                <th>X</th>
                <th>2</th>
                {calculate1x2(Math.round(Home/(Home+Away)*100),Math.round(Away/(Home+Away)*100) )}
              </tr>
              <tr>
                
              </tr>
            </table>
        </div>
    )
          
}
// 

export default ClubsResults;

  