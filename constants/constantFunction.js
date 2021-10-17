export function getChatterId(id) {
    return `CHATTER_${id}`;
}

export function getGroupsId(id) {
    return `GROUPCHATTER_${id}`;
}

export const getCurrentDateReverse=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return `${year}-${month}-${date}`;
}

export const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
}

const {DateTime} = require("luxon");

export const Luxon = DateTime;