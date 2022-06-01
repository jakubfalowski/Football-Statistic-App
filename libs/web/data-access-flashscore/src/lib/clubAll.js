import ClubResults from "./clubResults"
import './style.css'
import { Table } from '@mantine/core';

export function ClubAll(){
    const ths = (
        <tr>
            <td>Home points</td>
            <td>Home percent</td>
            <td>Away points</td>
            <td>Away percent</td>
            <td>1</td>
            <td>X</td>
            <td>2</td>
            <td>Result</td>
        </tr>
    )

    const rows = (
        <ClubResults home="OpNH7Ouf" away="tlYOere0"/> 
    )
    return(
    <Table captionSide="bottom">
      <caption>Moja aplikacja</caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
    )
}

export default ClubAll