import { useParams } from "react-router-dom";
import { useState } from "react";

import ClubResults, {Home, Away, homeValueCopy} from "./clubResults"
import allMatchesPush, {team1Value, team2Value, goals,homeMatches, awayMatches, multiplier } from "./allMatchesPush";
import './style.css'
import { Table, Button, Collapse } from '@mantine/core';
import MatchPrediction from "./matchPrediction";
import { convertToDate } from "./convertToDate";

    export let homeValue = 0;
    export let awayValue = 0;
    let team1;
    let team2;
    let renderA = 0;
    let renderH = 0;

export function ClubAll(){
    const [opened, setOpen] = useState(false);
    const {match,home,away} = useParams();

    let textButton;
    if(opened === false) textButton = "rozwiń";
    else textButton = "zwiń";
    
    const td1 = (
    <tr>
        <td>Dokładny wynik</td>
        <td>Gospodarze</td>
        <td>Remis</td>
        <td>Goście</td>
    </tr>
    )
    const td2 =(
        <tr>
            <td> </td>
            <td>Gospodarze</td>
            <td>Remis</td>
            <td>Goście</td>
        </tr>
    )

    const row1 = (<tr><ClubResults home={home} away={away}/></tr>)
    const row2 = (<MatchPrediction match={match}/>)
    return(
    <>
    <h2>Moja aplikacja przewidująca wyniki</h2>
    <Button onClick={() => setOpen((o) => !o)}>
        {textButton}
      </Button>
    <Collapse in={opened}>
    <h1>{team1} - {team2}</h1>
    <Table captionSide="bottom" className="myScript">
        <caption>Moja aplikacja</caption>
        <thead>{td1}</thead>
        <tbody>{row1}</tbody>
    </Table>

        <h2>Zasada liczenia</h2>
        <h4>Łączne punkty gospodarzy {homeValue+team1Value}, u siebie: {homeValue}, forma: {team1Value}</h4>
        {homeMatches.slice(homeMatches.length-5,homeMatches.length).map((match, i) =>{
            if(i === 0) renderH += 1;
            if(renderH <= 1) {
                if(parseInt(match.HOME_SCORE_CURRENT) === parseInt(match.AWAY_SCORE_CURRENT)) homeValue += 1;
                else if(parseInt(match.HOME_SCORE_CURRENT) > parseInt(match.AWAY_SCORE_CURRENT)) homeValue += 3;
                team1 = match.HOME_NAME;
            }
            return(<p><i>{match.HOME_NAME}</i> {match.HOME_SCORE_CURRENT}:{match.AWAY_SCORE_CURRENT} {match.AWAY_NAME} </p>)
            
        })
        }
        <h4>Łączne punkty gości {awayValue+team2Value}, na wyjeździe: {awayValue}, forma: {team2Value}</h4>
        {awayMatches.slice(awayMatches.length-5, awayMatches.length).map((match, i) =>{
            if(i === 0) renderA +=1;
            if(renderA <= 1) {
                if(parseInt(match.HOME_SCORE_CURRENT) === parseInt(match.AWAY_SCORE_CURRENT)) awayValue += 1;
                else if(parseInt(match.HOME_SCORE_CURRENT) < parseInt(match.AWAY_SCORE_CURRENT)) awayValue += 3;
                team2 = match.AWAY_NAME;
            }
            return(<p>{match.HOME_NAME} {match.HOME_SCORE_CURRENT}:{match.AWAY_SCORE_CURRENT} <i>{match.AWAY_NAME}</i> </p>)
            
        })
        }
      </Collapse>
    <br />
    <Table captionSide="bottom" className="odds">
        <caption>Na podstawie kursów</caption>
        <thead>{td2}</thead>
        <tbody>{row2}</tbody>
    </Table>
    </>
    )
}

export default ClubAll