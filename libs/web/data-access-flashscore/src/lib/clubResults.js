import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MatchStatistic from "./matchStatistic";
import { calculate1x2 } from "./calculate1x2";
import { allMatchesPush, teamValue,goals,homeMatches, awayMatches, multiplier } from "./allMatchesPush";
import { homeMatchesPush, homeValue } from "./homeMatchesPush";
import { awayMatchesPush, awayValue } from "./awayMatchesPush";
import {options} from './fetchOption'

   export function ClubResults(props){
      const [clubs, setClubs] = useState([]);
      const [clubs2, setClubs2] = useState([]);
      let Home = 0;
      let Away = 0;
      let ifFetch = true;

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
      console.log(teamValue+"h"+homeValue)
      teamStrength('away');
      console.log(teamValue+"a"+awayValue)
      

      function teamStrength(team){

        if(team === 'home'){
          console.log('home')
          console.log(clubs)
          clubs.slice(clubs.length-15, clubs.length).map((item, lastMatches) => {
            allMatchesPush(item, lastMatches, props.home)
          })

          homeMatches.slice(homeMatches.length-5,homeMatches.length).map((item,lastMatches) =>{
            homeMatchesPush(item,lastMatches, props.home)
          })
          Home = teamValue+homeValue // home
        }

        if(team === 'away'){
          console.log('away')
          console.log(clubs2)
          clubs2.slice(clubs2.length-15, clubs2.length).map((item, lastMatches) => {
            allMatchesPush(item, lastMatches, props.away)
          })
          awayMatches.slice(awayMatches.length-5,awayMatches.length).map((item, lastMatches) =>{
            awayMatchesPush(item, lastMatches, props.home);
          })
          Away = teamValue+awayValue;
        } 
      }
    return(
      <>
        {/* <td>{Home}</td> */}
        {/* <td>{Math.round(Home/(Home+Away)*100)}%</td> */}
        {/* <td>{Away}</td> */}
        {/* <td>{Math.round(Away/(Home+Away)*100)}% </td> */}
          {calculate1x2(Math.round(Home/(Home+Away)*100),Math.round(Away/(Home+Away)*100), goals)}
      </>
    )
  }

export default ClubResults;

  