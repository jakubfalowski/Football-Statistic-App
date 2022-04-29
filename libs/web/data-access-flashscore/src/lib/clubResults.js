import React, {useState} from "react";
import { useParams } from "react-router-dom";

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
    'X-RapidAPI-Key': '1941a7725amshe72888a2f321827p18582bjsnddf354460ab2'
  }
};

// 35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971 KEY2

export function ClubResults(){
  const {query} = useParams();
    const [clubs, setClubs] = useState([]);
    let teamValue = 0;
    let multiplier = 1;

      if (!query) return<></>;
  
      async function fetchData() {
        const response = await fetch(
          `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${query}&locale=en_GB&page=1`,options
        );
        const data = await response.json();
        const results = data.DATA[0].EVENTS;
        console.log(results);
        setClubs(results);
      }
      if(clubs !== undefined){
        clubs.slice(clubs.length-15, clubs.length).map((item, lastMatches) => {
          if(lastMatches < 5) multiplier = 0.75
          else if(lastMatches < 10) multiplier = 1
          else multiplier = 1.25

          if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) teamValue += (1*multiplier);
          if(item.HOME_PARTICIPANT_IDS[0]===query){
            if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
          }
          else{
            if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
          }
        })
      }

    return(
        <div>
            <h3> Wyszukaj klub </h3>
            <div><a href="/flashscore">wróć</a></div>
            <table>
              <tr>
                <th>Gospodarze</th>
                <th>Goście</th>
              </tr>
            {clubs !== undefined ? clubs.slice(clubs.length-15, clubs.length).map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.HOME_NAME} {item.HOME_SCORE_CURRENT}</td>
                <td>{item.AWAY_NAME} {item.AWAY_SCORE_CURRENT}</td>
                <td> {i} </td>
              </tr>
            )
            }): 
            <tr>
                <td colspan="2">Brak wyników wyszukiwania</td>
            </tr>}
            </table>
            <b>{teamValue}</b>
            <button onClick={fetchData}>XD</button>
        </div>
    )
}

export default ClubResults;

  