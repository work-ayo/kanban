const ACCESS='accessToken'; const REFRESH='refreshToken';
export const authStorage={getAccess:()=>localStorage.getItem(ACCESS),getRefresh:()=>localStorage.getItem(REFRESH),setTokens:(a:string,r:string)=>{localStorage.setItem(ACCESS,a);localStorage.setItem(REFRESH,r);},clear:()=>{localStorage.removeItem(ACCESS);localStorage.removeItem(REFRESH);}};
