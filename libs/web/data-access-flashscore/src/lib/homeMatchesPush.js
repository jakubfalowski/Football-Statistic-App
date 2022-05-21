export let homeValue = 0;

export function homeMatchesPush(item, query){
    if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) homeValue += 1;
            if(item.HOME_PARTICIPANT_IDS[0]===query){
              if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) homeValue += 3;
            }
            else{
              if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) homeValue += 3;
            }
}