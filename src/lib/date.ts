export const toDateInput=(d:string)=>new Date(d).toISOString().slice(0,10);
export const today=()=>new Date().toISOString().slice(0,10);
