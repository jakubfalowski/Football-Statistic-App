export let awayValue = 0;

export function awayMatchesPush(item, query){
    if(item.HOME_SCORE_CURRENT === item.AWAY_SCORE_CURRENT) awayValue += 1;
            if(item.AWAY_PARTICIPANT_IDS[0]===query){
              if(item.HOME_SCORE_CURRENT < item.AWAY_SCORE_CURRENT) awayValue += 3;
            }
            else{
              if(item.HOME_SCORE_CURRENT > item.AWAY_SCORE_CURRENT) awayValue += 3;
            }
}