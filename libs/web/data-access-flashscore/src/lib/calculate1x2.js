export function calculate1x2(homePercent,awayPercent){
    let winHomePercent = 30;
    let drawPercent = 40;
    let winAwayPercent = 30;
    

    if(homePercent>50 && homePercent<60){
      winHomePercent += (homePercent-50)*2
      drawPercent -= (homePercent-50)
      winAwayPercent -= (homePercent-50)
    }
    else if(homePercent>=60){
      winHomePercent += 20 + (homePercent-60)
      drawPercent -= 10 - (homePercent-60)/2
      winAwayPercent -= 10 - (homePercent-60)/2
    }
    else if(homePercent<=50 && homePercent > 40){
        winAwayPercent += (awayPercent-50)*2
        drawPercent -= (awayPercent-50)
        winHomePercent -= (awayPercent-50)
      }
    else{
        winAwayPercent += 20 + (awayPercent-60)
        drawPercent -= 10 - (awayPercent-60)/2
        winHomePercent -= 10 - (awayPercent-60)/2
      }
    return(
    <>
      <td>{winHomePercent}</td>
      <td>{drawPercent}</td>
      <td>{winAwayPercent}</td>
      <h1>{homePercent}  {awayPercent}</h1>
    </>)
  }