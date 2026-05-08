export const startOfWeek=(d:Date)=>{const x=new Date(d);const day=x.getUTCDay();const diff=(day+6)%7;x.setUTCDate(x.getUTCDate()-diff);x.setUTCHours(0,0,0,0);return x;};
