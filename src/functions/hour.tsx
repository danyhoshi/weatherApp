export function showTime(){
    let myDate = new Date();
    let hours = myDate.getHours();
    // let minutes = myDate.getMinutes();
    // let seconds = myDate.getSeconds();
   
    //hours = (hours < 10) ? "0" + hours : hours.toString();
    // minutes = (minutes < 10) ? "0" + minutes : minutes.toString();
    // seconds = (seconds < 10) ? "0" + seconds : seconds.toString();

   // return hours + ":" + minutes + ":" + seconds;
    return hours;
}

export function showTimeDay(date: string){
    let myDate = new Date(date+'T00:00:00');
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[myDate.getDay()];
    return day;
}

export function dateFormat(date: string) {
    let arrayDateHour = date.split('T');
    let dateF = arrayDateHour[0].split('-');
    return dateF[2] + '-' + dateF[1] + '-' + dateF[0];
}
