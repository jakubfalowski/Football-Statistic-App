import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MatchStatistic from "./matchStatistic";
import { calculate1x2 } from "./calculate1x2";
import { allMatchesPush, team1Value, team2Value, goals,homeMatches, awayMatches, multiplier } from "./allMatchesPush";
// import { homeMatchesPush, homeValue } from "./homeMatchesPush";
// import { awayMatchesPush, awayValue } from "./awayMatchesPush";
import { homeValue, awayValue } from "./clubAll";
import {options} from './fetchOption'

export let Home;
export let Away;
export let team1;
export let team2;


   export function ClubResults(props){
      const [clubs, setClubs] = useState([]);
      const [clubs2, setClubs2] = useState([]);
      const ifFetch = true;

      async function fetchData(query) {
        try{
        const response = await fetch(
          `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${query}&locale=en_GB&page=1`,options
        );
        const data = await response.json();
        const results = data.DATA[0].EVENTS;
        if(query === props.home){
          setClubs(results);
        } 
        if(query === props.away) {
          setClubs2(results)
        }
        
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
          clubs.slice(clubs.length-15, clubs.length).map((item, lastMatches) => {
            allMatchesPush(item, lastMatches, props.home, "home")
          })
          Home = team1Value+homeValue // home
          console.log(Home, team1Value, homeValue);
        }

        if(team === 'away'){
          clubs2.slice(clubs2.length-15, clubs2.length).map((item, lastMatches) => {
            allMatchesPush(item, lastMatches, props.away, "away")
          })
          Away = team2Value+awayValue;
          console.log(Away,team2Value, awayValue);
        } 
      }
    return(
      <>
          {calculate1x2(Math.round(Home/(Home+Away)*100),Math.round(Away/(Home+Away)*100), goals)}
      </>
    )
  }

export default ClubResults;

  