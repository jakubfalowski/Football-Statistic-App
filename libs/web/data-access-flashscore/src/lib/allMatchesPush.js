export let multiplier = 1;
export let teamValue = 0;
export let homeMatches = [];
export let awayMatches = [];
export let goals = 0;
let render = 0;

export function allMatchesPush(item, lastMatches, query){
    if(lastMatches === 0) {
      teamValue = 0;
      render += 1;
    }
    if(lastMatches < 5) multiplier = 0.75
    else if(lastMatches < 10) multiplier = 1
    else multiplier = 1.25

    if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) teamValue += (1*multiplier);
    if(item.HOME_PARTICIPANT_IDS[0]===query){
      if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
      homeMatches.push(item)
      if(render <=2) goals += parseInt(item.HOME_SCORE_CURRENT)+parseInt(item.AWAY_SCORE_CURRENT)
    }
    else if(item.AWAY_PARTICIPANT_IDS[0]===query){
      if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
      awayMatches.push(item)
      if(render <=2) goals += parseInt(item.HOME_SCORE_CURRENT)+parseInt(item.AWAY_SCORE_CURRENT)
    }
    console.log("goals: "+goals+"team: "+teamValue)
}