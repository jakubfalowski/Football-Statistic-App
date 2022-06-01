import { useEffect, useState } from "react";

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


export function MatchPrediction(){
    const [homeOdds, setHomeOdds] = useState(0);
    const [drawOdds, setDrawOdds] = useState(0);
    const [awayOdds, setAwayOdds] = useState(0);
    
    let ifFetch = true

    async function fetchData() {
        try{
        const response = await fetch(
          `https://flashscore.p.rapidapi.com/v1/events/odds?locale=en_GB&event_id=2kMVjvr1`,options
        );
        const data = await response.json();
        setHomeOdds(data.DATA[0].PERIODS[0].GROUPS[0].MARKETS[0].ODD_CELL_FIRST.VALUE)      
        setDrawOdds(data.DATA[0].PERIODS[0].GROUPS[0].MARKETS[0].ODD_CELL_SECOND.VALUE)  
        setAwayOdds(data.DATA[0].PERIODS[0].GROUPS[0].MARKETS[0].ODD_CELL_THIRD.VALUE)  
      } catch(error){
          console.log(error)
        }
      }

      useEffect(() => {
        fetchData();
      }, [ifFetch]);
      return(
      <div>
          <p>{homeOdds} = {(parseFloat(homeOdds)*88/100).toFixed(2)} {(1/parseFloat(homeOdds)*88/100).toFixed(2)}%</p>
          <p>{drawOdds} = {(parseFloat(drawOdds)*88/100).toFixed(2)} {(1/parseFloat(drawOdds)*88/100).toFixed(2)}%</p>
          <p>{awayOdds} = {(parseFloat(awayOdds)*88/100).toFixed(2)} {(1/parseFloat(awayOdds)*88/100).toFixed(2)}%</p>
      </div>)
}

export default MatchPrediction