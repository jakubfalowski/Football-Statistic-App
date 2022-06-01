import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MatchStatistic from "./matchStatistic";
import { calculate1x2 } from "./calculate1x2";
import { allMatchesPush, teamValue,goals,homeMatches, awayMatches, multiplier } from "./allMatchesPush";
import { homeMatchesPush, homeValue } from "./homeMatchesPush";
import { awayMatchesPush, awayValue } from "./awayMatchesPush";

const key1 = '1941a7725amshe72888a2f321827p18582bjsnddf354460ab2'
const key2 = '35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971'
const key3 = 'a33fdebe8cmshe3e2c58ac427eebp1b8d9bjsn0e949c6172f7'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
    'X-RapidAPI-Key': key1
  }
};



   export function ClubResults(props){
      const [clubs, setClubs] = useState([]);
      const [clubs2, setClubs2] = useState([]);
    let Home = 0;
    let Away = 0;
    let ifFetch = true;
    let changeQuery = false;

      async function fetchData(query) {
        try{
        const response = await fetch(
          `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${query}&locale=en_GB&page=1`,options
        );
        const data = await response.json();
        const results = data.DATA[0].EVENTS;
        if(query === props.home) setClubs(results);
        if(query === props.away) setClubs2(results)
      } catch(error){
          console.log(error)
        }
      }

      
      useEffect(() => {
        fetchData(props.home);
        fetchData(props.away);
      }, [ifFetch]);

      teamStrength('home');
      teamStrength('away');

      function teamStrength(team){

        if(team === 'home'){
          console.log('home')
          console.log(clubs)
          clubs.slice(clubs.length-15, clubs.length).map((item, lastMatches) => {
            allMatchesPush(item, lastMatches, props.home)
          })

          homeMatches.slice(homeMatches.length-5,homeMatches.length).map(item =>{
            homeMatchesPush(item, props.home)
          })
          Home = teamValue+homeValue // home
        }

        if(team === 'away'){
          console.log('away')
          console.log(clubs2)
          clubs2.slice(clubs2.length-15, clubs2.length).map((item, lastMatches) => {
            allMatchesPush(item, lastMatches, props.away)
          })
          awayMatches.slice(awayMatches.length-5,awayMatches.length).map(item =>{
            awayMatchesPush(item, props.home);
          })
          Away = teamValue+awayValue;
        } 
      }
    return(
      <tr>
        <td>{Home}</td>
        <td>{Math.round(Home/(Home+Away)*100)}%</td>
        <td>{Away}</td>
        <td>{Math.round(Away/(Home+Away)*100)}% </td>
          {calculate1x2(Math.round(Home/(Home+Away)*100),Math.round(Away/(Home+Away)*100), goals)}
      </tr>
    )

  }
    
          
// 

export default ClubResults;

  