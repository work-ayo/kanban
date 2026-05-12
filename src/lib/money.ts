export const formatMoney=(v:number|string)=>new Intl.NumberFormat('ko-KR').format(Number(v));
