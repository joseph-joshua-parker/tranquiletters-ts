export const todayIs = ()=>{
    const date = new Date();
    return `${date.getDate()} + ${date.getMonth()+1}`;
}

export const convertHMS = (seconds: number) =>{
    const hours = Math.trunc(seconds/3600)
    const minutes = Math.trunc(seconds/60 - hours*60);
    const remainingSeconds = Math.trunc(seconds - (hours*3600 +minutes*60));
    return `${hours}h: ${minutes}m: ${remainingSeconds}s`;
}