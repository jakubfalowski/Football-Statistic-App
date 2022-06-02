export let homeValue = 0;

export function homeMatchesPush(item,lastMatches, query){
  console.log(item)
  console.log(lastMatches+": "+item.HOME_SCORE_CURRENT+"-"+item.AWAY_SCORE_CURRENT+" to "+homeValue)
  if(lastMatches === 0) homeValue = 0;
  if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) homeValue += 1;
  else if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) homeValue += 3;
  else if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) homeValue += 3;
}