export let awayValue = 0;

export function awayMatchesPush(item,lastMatches, query){
  console.log(lastMatches+": "+item.HOME_SCORE_CURRENT+"-"+item.AWAY_SCORE_CURRENT+" to "+awayValue)
  if(lastMatches === 0) awayValue = 0;
  if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) awayValue += 1;
  else if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) awayValue += 3;
  else if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) awayValue += 3;
}