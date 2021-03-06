export const nowLocaleString = new Date(Date.now()).toLocaleString();
export const nowLocaleDateString = new Date(Date.now()).toLocaleDateString("fr-FR");
export const nowLocaleTimeString = new Date(Date.now()).toLocaleTimeString();
export const nowDateString = new Date(Date.now()).toDateString();
export const nowUTCString = new Date(Date.now()).toUTCString();
export const nowISOString = new Date(Date.now()).toISOString();
export const nowJSON = new Date(Date.now()).toJSON();
export const nowString = new Date(Date.now()).toString();

export const nowDate = new Date(Date.now()).getDate();
export const nowDay = new Date(Date.now()).getDay();
export const nowFullYear = new Date(Date.now()).getFullYear();
export const nowMonth = new Date(Date.now()).getMonth() + 1;
export const nowHours = new Date(Date.now()).getHours();
export const nowSeconds = new Date(Date.now()).getSeconds();
export const nowMinutes = new Date(Date.now()).getMinutes();
export const nowMilliseconds = new Date(Date.now()).getMilliseconds();

export const nowUTCDate = new Date(Date.now()).getUTCDate();
export const nowUTCDay = new Date(Date.now()).getUTCDay();
export const nowUTCFullYear = new Date(Date.now()).getUTCFullYear();
export const nowUTCMonth = new Date(Date.now()).getUTCMonth() + 1;
export const nowUTCHours = new Date(Date.now()).getUTCHours();
export const nowUTCSeconds = new Date(Date.now()).getUTCSeconds();
export const nowUTCMinutes = new Date(Date.now()).getUTCMinutes();
export const nowUTCMilliseconds = new Date(Date.now()).getUTCMilliseconds();

export const useDate = (e) => new Date(e).getDate();
export const useDay = (e) => new Date(e).getDay();
export const useFullYear = (e) => new Date(e).getFullYear();
export const useMonth = (e) => new Date(e).getMonth() + 1;
export const useHours = (e) => new Date(e).getHours();
export const useSeconds = (e) => new Date(e).getSeconds();
export const useMinutes = (e) => new Date(e).getMinutes();
export const useMilliseconds = (e) => new Date(e).getMilliseconds();

export const useUTCDate = (e) => new Date(e).getUTCDate();
export const useUTCDay = (e) => new Date(e).getUTCDay();
export const useUTCFullYear = (e) => new Date(e).getUTCFullYear();
export const useUTCMonth = (e) => new Date(e).getUTCMonth() + 1;
export const useUTCHours = (e) => new Date(e).getUTCHours();
export const useUTCSeconds = (e) => new Date(e).getUTCSeconds();
export const useUTCMinutes = (e) => new Date(e).getUTCMinutes();
export const useUTCMilliseconds = (e) => new Date(e).getUTCMilliseconds();


export const getCurrentDate=(format)=>{
    let lower = format.toLowerCase();
    let date = "";
    switch (format) {
        case "dd/mm/yyyy":date = `${nowDate}/${nowMonth}/${nowFullYear}`;
            break;
        case "dd/mm/yyyy hh":date = `${nowDate}/${nowMonth}/${nowFullYear} ${nowHours}`;
            break;
        case "dd/mm/yyyy hh:mm":date = `${nowDate}/${nowMonth}/${nowFullYear} ${nowHours}:${nowMinutes}`;
            break;
        case "dd/mm/yyyy hh:mm:ss":date = `${nowDate}/${nowMonth}/${nowFullYear} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "dd-mm-yyyy":date = `${nowDate}-${nowMonth}-${nowFullYear}`;
            break;
        case "dd-mm-yyyy hh":date = `${nowDate}-${nowMonth}-${nowFullYear} ${nowHours}`;
            break;
        case "dd-mm-yyyy hh:mm":date = `${nowDate}-${nowMonth}-${nowFullYear} ${nowHours}:${nowMinutes}`;
            break;
        case "dd-mm-yyyy hh:mm:ss":date = `${nowDate}-${nowMonth}-${nowFullYear} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "yyyy/mm/dd":date = `${nowFullYear}/${nowMonth}/${nowDate}`;
            break;
        case "yyyy/mm/dd hh":date = `${nowFullYear}/${nowMonth}/${nowDate} ${nowHours}`;
            break;
        case "yyyy/mm/dd hh:mm":date = `${nowFullYear}/${nowMonth}/${nowDate} ${nowHours}:${nowMinutes}`;
            break;
        case "yyyy/mm/dd hh:mm:ss":date = `${nowFullYear}/${nowMonth}/${nowDate} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "yyyy-mm-dd":date = `${nowFullYear}-${nowMonth}-${nowDate}`;
            break;
        case "yyyy-mm-dd hh":date = `${nowFullYear}-${nowMonth}-${nowDate} ${nowHours}`;
            break;
        case "yyyy-mm-dd hh:mm":date = `${nowFullYear}-${nowMonth}-${nowDate} ${nowHours}:${nowMinutes}`;
            break;
        case "yyyy-mm-dd hh:mm:ss":date = `${nowFullYear}-${nowMonth}-${nowDate} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "mm/dd/yyyy":date = `${nowMonth}/${nowDate}/${nowFullYear}`;
            break;
        case "mm/dd/yyyy hh":date = `${nowMonth}/${nowDate}/${nowFullYear} ${nowHours}`;
            break;
        case "mm/dd/yyyy hh:mm":date = `${nowMonth}/${nowDate}/${nowFullYear} ${nowHours}:${nowMinutes}`;
            break;
        case "mm/dd/yyyy hh:mm:ss":date = `${nowMonth}/${nowDate}/${nowFullYear} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "mm-dd-yyyy":date = `${nowMonth}-${nowDate}-${nowFullYear}`;
            break;
        case "mm-dd-yyyy hh":date = `${nowMonth}-${nowDate}-${nowFullYear} ${nowHours}`;
            break;
        case "mm-dd-yyyy hh:mm":date = `${nowMonth}-${nowDate}-${nowFullYear} ${nowHours}:${nowMinutes}`;
            break;
        case "mm-dd-yyyy hh:mm:ss":date = `${nowMonth}-${nowDate}-${nowFullYear} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "yyyy/dd/mm":date = `${nowFullYear}/${nowDate}/${nowMonth}`;
            break;
        case "yyyy/dd/mm hh":date = `${nowFullYear}/${nowDate}/${nowMonth} ${nowHours}`;
            break;
        case "yyyy/dd/mm hh:mm":date = `${nowFullYear}/${nowDate}/${nowMonth} ${nowHours}:${nowMinutes}`;
            break;
        case "yyyy/dd/mm hh:mm:ss":date = `${nowFullYear}/${nowDate}/${nowMonth} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "yyyy-dd-mm":date = `${nowFullYear}-${nowDate}-${nowMonth}`;
            break;
        case "yyyy-dd-mm hh":date = `${nowFullYear}-${nowDate}-${nowMonth} ${nowHours}`;
            break;
        case "yyyy-dd-mm hh:mm":date = `${nowFullYear}-${nowDate}-${nowMonth} ${nowHours}:${nowMinutes}`;
            break;
        case "yyyy-dd-mm hh:mm:ss":date = `${nowFullYear}-${nowDate}-${nowMonth} ${nowHours}:${nowMinutes}:${nowMilliseconds}`;
            break;
        case "hh:mm":date = `${nowHours}:${nowMinutes}`;
                break;
        case "hh:mm:ss":date = `${nowHours}:${nowMinutes}:${nowMilliseconds}`;
                break;
        case "mm:ss":date = `${nowMinutes}:${nowMilliseconds}`;
                break;
        default:null;
            break;
    }
return date;
}

export const getCurrentUTCDate=(format)=>{
    let lower = format.toLowerCase();
    let date = "";
    switch (lower) {
        case "dd/mm/yyyy":date = `${nowUTCDay(e)}/${nowUTCMonth(e)}/${nowUTCFullYear(e)}`;
            break;
        case "dd/mm/yyyy hh":date = `${nowUTCDay(e)}/${nowUTCMonth(e)}/${nowUTCFullYear(e)} ${nowUTCHours(e)}`;
            break;
        case "dd/mm/yyyy hh:mm":date = `${nowUTCDay(e)}/${nowUTCMonth(e)}/${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "dd/mm/yyyy hh:mm:ss":date = `${nowUTCDay(e)}/${nowUTCMonth(e)}/${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "dd-mm-yyyy":date = `${nowUTCDay(e)}-${nowUTCMonth(e)}-${nowUTCFullYear(e)}`;
            break;
        case "dd-mm-yyyy hh":date = `${nowUTCDay(e)}-${nowUTCMonth(e)}-${nowUTCFullYear(e)} ${nowUTCHours(e)}`;
            break;
        case "dd-mm-yyyy hh:mm":date = `${nowUTCDay(e)}-${nowUTCMonth(e)}-${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "dd-mm-yyyy hh:mm:ss":date = `${nowUTCDay(e)}-${nowUTCMonth(e)}-${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "yyyy/mm/dd":date = `${nowUTCFullYear(e)}/${nowUTCMonth(e)}/${nowUTCDay(e)}`;
            break;
        case "yyyy/mm/dd hh":date = `${nowUTCFullYear(e)}/${nowUTCMonth(e)}/${nowUTCDay(e)} ${nowUTCHours(e)}`;
            break;
        case "yyyy/mm/dd hh:mm":date = `${nowUTCFullYear(e)}/${nowUTCMonth(e)}/${nowUTCDay(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "yyyy/mm/dd hh:mm:ss":date = `${nowUTCFullYear(e)}/${nowUTCMonth(e)}/${nowUTCDay(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "yyyy-mm-dd":date = `${nowUTCFullYear(e)}-${nowUTCMonth(e)}-${nowUTCDay(e)}`;
            break;
        case "yyyy-mm-dd hh":date = `${nowUTCFullYear(e)}-${nowUTCMonth(e)}-${nowUTCDay(e)} ${nowUTCHours(e)}`;
            break;
        case "yyyy-mm-dd hh:mm":date = `${nowUTCFullYear(e)}-${nowUTCMonth(e)}-${nowUTCDay(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "yyyy-mm-dd hh:mm:ss":date = `${nowUTCFullYear(e)}-${nowUTCMonth(e)}-${nowUTCDay(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "mm/dd/yyyy":date = `${nowUTCMonth(e)}/${nowUTCDay(e)}/${nowUTCFullYear(e)}`;
            break;
        case "mm/dd/yyyy hh":date = `${nowUTCMonth(e)}/${nowUTCDay(e)}/${nowUTCFullYear(e)} ${nowUTCHours(e)}`;
            break;
        case "mm/dd/yyyy hh:mm":date = `${nowUTCMonth(e)}/${nowUTCDay(e)}/${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "mm/dd/yyyy hh:mm:ss":date = `${nowUTCMonth(e)}/${nowUTCDay(e)}/${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "mm-dd-yyyy":date = `${nowUTCMonth(e)}-${nowUTCDay(e)}-${nowUTCFullYear(e)}`;
            break;
        case "mm-dd-yyyy hh":date = `${nowUTCMonth(e)}-${nowUTCDay(e)}-${nowUTCFullYear(e)} ${nowUTCHours(e)}`;
            break;
        case "mm-dd-yyyy hh:mm":date = `${nowUTCMonth(e)}-${nowUTCDay(e)}-${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "mm-dd-yyyy hh:mm:ss":date = `${nowUTCMonth(e)}-${nowUTCDay(e)}-${nowUTCFullYear(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "yyyy/dd/mm":date = `${nowUTCFullYear(e)}/${nowUTCDay(e)}/${nowUTCMonth(e)}`;
            break;
        case "yyyy/dd/mm hh":date = `${nowUTCFullYear(e)}/${nowUTCDay(e)}/${nowUTCMonth(e)} ${nowUTCHours(e)}`;
            break;
        case "yyyy/dd/mm hh:mm":date = `${nowUTCFullYear(e)}/${nowUTCDay(e)}/${nowUTCMonth(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "yyyy/dd/mm hh:mm:ss":date = `${nowUTCFullYear(e)}/${nowUTCDay(e)}/${nowUTCMonth(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "yyyy-dd-mm":date = `${nowUTCFullYear(e)}-${nowUTCDay(e)}-${nowUTCMonth(e)}`;
            break;
        case "yyyy-dd-mm hh":date = `${nowUTCFullYear(e)}-${nowUTCDay(e)}-${nowUTCMonth(e)} ${nowUTCHours(e)}`;
            break;
        case "yyyy-dd-mm hh:mm":date = `${nowUTCFullYear(e)}-${nowUTCDay(e)}-${nowUTCMonth(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
            break;
        case "yyyy-dd-mm hh:mm:ss":date = `${nowUTCFullYear(e)}-${nowUTCDay(e)}-${nowUTCMonth(e)} ${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
            break;
        case "hh:mm":date = `${nowUTCHours(e)}:${nowUTCMinutes(e)}`;
                break;
        case "hh:mm:ss":date = `${nowUTCHours(e)}:${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
                break;
        case "mm:ss":date = `${nowUTCMinutes(e)}:${nowUTCMilliseconds(e)}`;
                break;
        default:null;
            break;
    }
return date;
}

export const getUseDate=(e,format)=>{
    let lower = format.toLowerCase();
    let date = "";

    switch (format) {
        case "dd/mm/yyyy":date = `${useDate(e)}/${useMonth(e)}/${useFullYear(e)}`;
            break;
        case "dd/mm/yyyy hh":date = `${useDate(e)}/${useMonth(e)}/${useFullYear(e)} ${useHours(e)}`;
            break;
        case "dd/mm/yyyy hh:mm":date = `${useDate(e)}/${useMonth(e)}/${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "dd/mm/yyyy hh:mm:ss":date = `${useDate(e)}/${useMonth(e)}/${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "dd-mm-yyyy":date = `${useDate(e)}-${useMonth(e)}-${useFullYear(e)}`;
            break;
        case "dd-mm-yyyy hh":date = `${useDate(e)}-${useMonth(e)}-${useFullYear(e)} ${useHours(e)}`;
            break;
        case "dd-mm-yyyy hh:mm":date = `${useDate(e)}-${useMonth(e)}-${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "dd-mm-yyyy hh:mm:ss":date = `${useDate(e)}-${useMonth(e)}-${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "yyyy/mm/dd":date = `${useFullYear(e)}/${useMonth(e)}/${useDate(e)}`;
            break;
        case "yyyy/mm/dd hh":date = `${useFullYear(e)}/${useMonth(e)}/${useDate(e)} ${useHours(e)}`;
            break;
        case "yyyy/mm/dd hh:mm":date = `${useFullYear(e)}/${useMonth(e)}/${useDate(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "yyyy/mm/dd hh:mm:ss":date = `${useFullYear(e)}/${useMonth(e)}/${useDate(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "yyyy-mm-dd":date = `${useFullYear(e)}-${useMonth(e)}-${useDate(e)}`;
            break;
        case "yyyy-mm-dd hh":date = `${useFullYear(e)}-${useMonth(e)}-${useDate(e)} ${useHours(e)}`;
            break;
        case "yyyy-mm-dd hh:mm":date = `${useFullYear(e)}-${useMonth(e)}-${useDate(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "yyyy-mm-dd hh:mm:ss":date = `${useFullYear(e)}-${useMonth(e)}-${useDate(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "mm/dd/yyyy":date = `${useMonth(e)}/${useDate(e)}/${useFullYear(e)}`;
            break;
        case "mm/dd/yyyy hh":date = `${useMonth(e)}/${useDate(e)}/${useFullYear(e)} ${useHours(e)}`;
            break;
        case "mm/dd/yyyy hh:mm":date = `${useMonth(e)}/${useDate(e)}/${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "mm/dd/yyyy hh:mm:ss":date = `${useMonth(e)}/${useDate(e)}/${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "mm-dd-yyyy":date = `${useMonth(e)}-${useDate(e)}-${useFullYear(e)}`;
            break;
        case "mm-dd-yyyy hh":date = `${useMonth(e)}-${useDate(e)}-${useFullYear(e)} ${useHours(e)}`;
            break;
        case "mm-dd-yyyy hh:mm":date = `${useMonth(e)}-${useDate(e)}-${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "mm-dd-yyyy hh:mm:ss":date = `${useMonth(e)}-${useDate(e)}-${useFullYear(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "yyyy/dd/mm":date = `${useFullYear(e)}/${useDate(e)}/${useMonth(e)}`;
            break;
        case "yyyy/dd/mm hh":date = `${useFullYear(e)}/${useDate(e)}/${useMonth(e)} ${useHours(e)}`;
            break;
        case "yyyy/dd/mm hh:mm":date = `${useFullYear(e)}/${useDate(e)}/${useMonth(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "yyyy/dd/mm hh:mm:ss":date = `${useFullYear(e)}/${useDate(e)}/${useMonth(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "yyyy-dd-mm":date = `${useFullYear(e)}-${useDate(e)}-${useMonth(e)}`;
            break;
        case "yyyy-dd-mm hh":date = `${useFullYear(e)}-${useDate(e)}-${useMonth(e)} ${useHours(e)}`;
            break;
        case "yyyy-dd-mm hh:mm":date = `${useFullYear(e)}-${useDate(e)}-${useMonth(e)} ${useHours(e)}:${useMinutes(e)}`;
            break;
        case "yyyy-dd-mm hh:mm:ss":date = `${useFullYear(e)}-${useDate(e)}-${useMonth(e)} ${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
            break;
        case "hh:mm":date = `${useHours(e)}:${useMinutes(e)}`;
                break;
        case "hh:mm:ss":date = `${useHours(e)}:${useMinutes(e)}:${useMilliseconds(e)}`;
                break;
        case "mm:ss":date = `${useMinutes(e)}:${useMilliseconds(e)}`;
                break;
        default:null;
            break;
    }
return date;
}

export const getUseUTCDate=(e,format)=>{
    let lower = format.toLowerCase();
    let date = "";
    switch (lower) {
        case "dd/mm/yyyy":date = `${useUTCDay(e)}/${useUTCMonth(e)}/${useUTCFullYear(e)}`;
            break;
        case "dd/mm/yyyy hh":date = `${useUTCDay(e)}/${useUTCMonth(e)}/${useUTCFullYear(e)} ${useUTCHours(e)}`;
            break;
        case "dd/mm/yyyy hh:mm":date = `${useUTCDay(e)}/${useUTCMonth(e)}/${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "dd/mm/yyyy hh:mm:ss":date = `${useUTCDay(e)}/${useUTCMonth(e)}/${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "dd-mm-yyyy":date = `${useUTCDay(e)}-${useUTCMonth(e)}-${useUTCFullYear(e)}`;
            break;
        case "dd-mm-yyyy hh":date = `${useUTCDay(e)}-${useUTCMonth(e)}-${useUTCFullYear(e)} ${useUTCHours(e)}`;
            break;
        case "dd-mm-yyyy hh:mm":date = `${useUTCDay(e)}-${useUTCMonth(e)}-${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "dd-mm-yyyy hh:mm:ss":date = `${useUTCDay(e)}-${useUTCMonth(e)}-${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "yyyy/mm/dd":date = `${useUTCFullYear(e)}/${useUTCMonth(e)}/${useUTCDay(e)}`;
            break;
        case "yyyy/mm/dd hh":date = `${useUTCFullYear(e)}/${useUTCMonth(e)}/${useUTCDay(e)} ${useUTCHours(e)}`;
            break;
        case "yyyy/mm/dd hh:mm":date = `${useUTCFullYear(e)}/${useUTCMonth(e)}/${useUTCDay(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "yyyy/mm/dd hh:mm:ss":date = `${useUTCFullYear(e)}/${useUTCMonth(e)}/${useUTCDay(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "yyyy-mm-dd":date = `${useUTCFullYear(e)}-${useUTCMonth(e)}-${useUTCDay(e)}`;
            break;
        case "yyyy-mm-dd hh":date = `${useUTCFullYear(e)}-${useUTCMonth(e)}-${useUTCDay(e)} ${useUTCHours(e)}`;
            break;
        case "yyyy-mm-dd hh:mm":date = `${useUTCFullYear(e)}-${useUTCMonth(e)}-${useUTCDay(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "yyyy-mm-dd hh:mm:ss":date = `${useUTCFullYear(e)}-${useUTCMonth(e)}-${useUTCDay(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "mm/dd/yyyy":date = `${useUTCMonth(e)}/${useUTCDay(e)}/${useUTCFullYear(e)}`;
            break;
        case "mm/dd/yyyy hh":date = `${useUTCMonth(e)}/${useUTCDay(e)}/${useUTCFullYear(e)} ${useUTCHours(e)}`;
            break;
        case "mm/dd/yyyy hh:mm":date = `${useUTCMonth(e)}/${useUTCDay(e)}/${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "mm/dd/yyyy hh:mm:ss":date = `${useUTCMonth(e)}/${useUTCDay(e)}/${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "mm-dd-yyyy":date = `${useUTCMonth(e)}-${useUTCDay(e)}-${useUTCFullYear(e)}`;
            break;
        case "mm-dd-yyyy hh":date = `${useUTCMonth(e)}-${useUTCDay(e)}-${useUTCFullYear(e)} ${useUTCHours(e)}`;
            break;
        case "mm-dd-yyyy hh:mm":date = `${useUTCMonth(e)}-${useUTCDay(e)}-${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "mm-dd-yyyy hh:mm:ss":date = `${useUTCMonth(e)}-${useUTCDay(e)}-${useUTCFullYear(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "yyyy/dd/mm":date = `${useUTCFullYear(e)}/${useUTCDay(e)}/${useUTCMonth(e)}`;
            break;
        case "yyyy/dd/mm hh":date = `${useUTCFullYear(e)}/${useUTCDay(e)}/${useUTCMonth(e)} ${useUTCHours(e)}`;
            break;
        case "yyyy/dd/mm hh:mm":date = `${useUTCFullYear(e)}/${useUTCDay(e)}/${useUTCMonth(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "yyyy/dd/mm hh:mm:ss":date = `${useUTCFullYear(e)}/${useUTCDay(e)}/${useUTCMonth(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "yyyy-dd-mm":date = `${useUTCFullYear(e)}-${useUTCDay(e)}-${useUTCMonth(e)}`;
            break;
        case "yyyy-dd-mm hh":date = `${useUTCFullYear(e)}-${useUTCDay(e)}-${useUTCMonth(e)} ${useUTCHours(e)}`;
            break;
        case "yyyy-dd-mm hh:mm":date = `${useUTCFullYear(e)}-${useUTCDay(e)}-${useUTCMonth(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}`;
            break;
        case "yyyy-dd-mm hh:mm:ss":date = `${useUTCFullYear(e)}-${useUTCDay(e)}-${useUTCMonth(e)} ${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
            break;
        case "hh:mm":date = `${useUTCHours(e)}:${useUTCMinutes(e)}`;
                break;
        case "hh:mm:ss":date = `${useUTCHours(e)}:${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
                break;
        case "mm:ss":date = `${useUTCMinutes(e)}:${useUTCMilliseconds(e)}`;
                break;
        default:null;
            break;
    }
return date;
}

export const getDayString = (l) => {   
    if (l.toUpperCase() == "L"){
        return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ nowDay ];
    }else{
        return ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"][ nowDay ];
    }
}

export const getMonthString = (l) => {   
    if (l.toUpperCase() == "L"){
        return ["January","February","Mars","April","May","June","July","August", "September","October","November","December"][ nowMonth ];
    }else{
        return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep","Oct","Nov","Dec"][ nowMonth ];
    }
}

export const getUseDayString = (l,index) => {   
    if (l.toUpperCase() == "L"){
        return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ index ];
    }else{
        return ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"][ index ];
    }
}

export const getUseMonthString = (l,index) => {   
    if (l.toUpperCase() == "L"){
        return ["January","February","Mars","April","May","June","July","August", "September","October","November","December"][ index ];
    }else{
        return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug", "Sep","Oct","Nov","Dec"][ index ];
    }
}

export const getLongDateString = (l,item) => {
    return `${getUseDayString(l,useDay(item))} ${useDate(item)} ${getUseMonthString(l,useMonth(item))} ${nowFullYear}`;
}