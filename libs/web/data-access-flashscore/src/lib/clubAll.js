import { useParams } from "react-router-dom";

import ClubResults from "./clubResults"
import './style.css'
import { Table } from '@mantine/core';
import MatchPrediction from "./matchPrediction";

export function ClubAll(props){
    const {match,home,away} = useParams();

    const td1 = (
    <tr>
        {/* <td>Punkty gospodarzy</td> */}
        {/* <td>Szanse gospodarzy bez remisu</td> */}
        {/* <td>Punkty gości</td> */}
        {/* <td>Szanse gości bez remisu</td> */}
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
    <Table captionSide="bottom" className="myScript">
        <caption>Moja aplikacja</caption>
        <thead>{td1}</thead>
        <tbody>{row1}</tbody>
    </Table>
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