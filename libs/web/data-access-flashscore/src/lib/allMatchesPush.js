export let multiplier = 1;
export let teamValue = 0;
export let homeMatches = [];
export let awayMatches = [];
export let goals = 0;

export function allMatchesPush(item, lastMatches, query){

    if(lastMatches < 5) multiplier = 0.75
    else if(lastMatches < 10) multiplier = 1
    else multiplier = 1.25

    if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) teamValue += (1*multiplier);
    if(item.HOME_PARTICIPANT_IDS[0]===query){
      if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
      homeMatches.push(item)
    }
    else if(item.AWAY_PARTICIPANT_IDS[0]===query){
      if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) teamValue += (3*multiplier);
      awayMatches.push(item)
    }

    goals += parseInt(item.HOME_SCORE_CURRENT)+parseInt(item.AWAY_SCORE_CURRENT)
    console.log("goals, team: "+goals, teamValue)
  }