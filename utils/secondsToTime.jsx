const secondsToTime=(seconds)=>{

    let returnTime=''

    if(seconds<0){
       returnTime = '15 minutes'
    }else{
        if(seconds<60){
            returnTime=`${Math.round(seconds)} seconds`
        }else
        if(seconds<3600){
            returnTime= `${Math.round(seconds/60)} minutes`
        }else
        if(seconds<86400){
            returnTime= `${Math.round(seconds/3600)} hours`
        }else
        if(seconds<2592000){
            console.log("here")
            returnTime= `${Math.round(seconds/86400)} days`
        }else
        if(seconds<31536000){
            console.log("here")
            returnTime= `${Math.round(seconds/2592000)} months`
        }else
        {
            returnTime= `${Math.round(seconds/31536000)} years`
        }
    }
    return returnTime;
}

export default secondsToTime;