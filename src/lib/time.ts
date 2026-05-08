export const minutesBetween=(s:string,e:string)=>Math.max(0,Math.floor((new Date(e).getTime()-new Date(s).getTime())/60000));
