import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MatchStatistic from "./matchStatistic";
import { calculate1x2 } from "./calculate1x2";

const key1 = '1941a7725amshe72888a2f321827p18582bjsnddf354460ab2'
const key2 = '35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971'
const key3 = 'a33fdebe8cmshe3e2c58ac427eebp1b8d9bjsn0e949c6172f7'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
    'X-RapidAPI-Key': key3
  }
};

export function ClubsResults(props){
  // const {query} = useParams();
    const [clubs, setClubs] = useState([]);
    let Home;
    let Away;
    let teamValue = 0;
    let homeValue = 0; 
    let awayValue = 0;
    let goals = 0;
    let homeMatches = [];
    let awayMatches = [];
    let multiplier = 1;
    let ifFetch = true;
    let changeQuery = false;

      ClubResults(props.home)
      ClubResults(props.away)

    function ClubResults(query){
      async function fetchData() {
        try{
        const response = await fetch(
          `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${query}&locale=en_GB&page=1`,options
        );
        const data = await response.json();
        const results = data.DATA[0].EVENTS;
        setClubs(results);} catch(error){
          console.log(error)
        }
      }
      
      useEffect(() => {
        fetchData();
      }, [ifFetch]);

      function teamStrength(){
        if(query===props.away){
          teamValue = 0;
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
          goals += parseInt(item.HOME_SCORE_CURRENT)+parseInt(item.AWAY_SCORE_CURRENT)
        })
      
        if(query===props.home){
          homeMatches.slice(homeMatches.length-5,homeMatches.length).map(item =>{
            if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) homeValue += 1;
            if(item.HOME_PARTICIPANT_IDS[0]===query){
              if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) homeValue += 3;
            }
            else{
              if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) homeValue += 3;
            }
          })
          Home = teamValue+homeValue // homeValue fixuje sie
          
        }

        if(query===props.away){
          awayMatches.slice(awayMatches.length-5,awayMatches.length).map(item =>{
            if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) awayValue += 1;
            if(item.AWAY_PARTICIPANT_IDS[0]===query){
              if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) awayValue += 3;
            }
            else{
              if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) awayValue += 3;
            }
          })
          Away = teamValue+awayValue;
        }
    }

    if(clubs !== undefined) teamStrength();
    
  }
    return(
      <div>
        <p>Home: {Home}, {Math.round(Home/(Home+Away)*100)}%</p>
        <p>Away: {Away}, {Math.round(Away/(Home+Away)*100)}% </p>
          {calculate1x2(Math.round(Home/(Home+Away)*100),Math.round(Away/(Home+Away)*100), goals)}
      </div>
    )
          
}
// 

export default ClubsResults;

  