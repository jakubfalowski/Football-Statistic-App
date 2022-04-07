import React, {useState} from "react";

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'transfermarket.p.rapidapi.com',
      'X-RapidAPI-Key': '35ffe6e4c5mshe6f63287717ea95p1950a0jsna16c5a14a971'
    }
  };
  
export default function Transfermarkt(){
    const [clubs, setClubs] = useState([]);
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!query) return;
  
      async function fetchData() {
        const response = await fetch(
          `https://transfermarket.p.rapidapi.com/search?query=${query}`,options
        );
        const data = await response.json();
        const results = data.players;
        setClubs(results);
      }
      fetchData();
    };

    return(
        <div>
          <form onSubmit={handleSubmit}>
            <h3> Wyszukaj zawodnika </h3>
            <input value={query} type="text" placeholder="Cristiano Ronaldo" onChange={e => setQuery(e.target.value)}/>
            <input type="submit" value="Submit" />
          </form>
            <table>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Imie i nazwisko zawodnika</th>
                <th>Klub</th>
                <th>Narodowość</th>
              </tr>
            {clubs !== undefined ? clubs.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td><img src={item.playerImage} alt={item.playerName+" - wygląd"}/></td>
                <td>{item.playerName}</td>
                <td>{item.club === 'Karriereende' ? 'Zakończył kariere' : item.club === 'Unbekannt' ? 'Klub nieznany' : item.club}</td>
                <td><img src={item.nationImage} alt={item.playerName+" - narodowość"}/></td>
              </tr>
            )
            }): <tr><td colspan="5">Brak wyników wyszukiwania</td></tr>}
            </table>
        </div>
    )
}


  