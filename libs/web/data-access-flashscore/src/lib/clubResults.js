import React, {useState} from "react";
// import PropTypes from 'prop-types';

var pathname = window.location.pathname;
pathname = pathname.replace('/flashscore/', '');
const query = pathname;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
    'X-RapidAPI-Key': '35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971'
  }
};

// 1941a7725amshe72888a2f321827p18582bjsnddf354460ab2 KEY2

export function ClubResults(){
    const [clubs, setClubs] = useState([]);

      if (!query) return<></>;
  
    //   async function fetchData() {
    //     const response = await fetch(
    //       `https://flashscore.p.rapidapi.com/v1/teams/results?sport_id=1&team_id=${query}&locale=en_GB&page=1`,options
    //     );
    //     const data = await response.json();
    //     const results = data.DATA.EVENTS;
    //     console.log(results);
    //     setClubs(results);
    //   }
      fetchData();


    return(
        <div>
            <h3> Wyszukaj klub </h3>
            <div><a href="/flashscore">wróć</a></div>
            <table>
              <tr>
                <th>Gospodarze</th>
                <th>Goście</th>
              </tr>
            {/* {clubs !== undefined ? clubs.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.HOME_NAME} {item.HOME_SCORE_CURRENT}</td>
                <td>{item.AWAY_NAME} {item.AWAY_SCORE_CURRENT}</td>
              </tr>
            )
            }): 
            <tr>
                <td colspan="2">Brak wyników wyszukiwania</td>
            </tr>} */}
            </table>
        </div>
    )
}

// FlashscoreClub.propTypes = {
//     query: PropTypes.string
// }

export default ClubResults;

  