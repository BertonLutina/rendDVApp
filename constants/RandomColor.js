import { colorblue, colorDarkblue, colorDarkGreen, colorDarkOrange, colorDarkYello, colorGreen, colorOrange, colorRose, colorYello } from "./Colors";

export function RandomColor(num) {
    let color = "";
    let ran = Math.floor(Math.random() * 10) + 1;
    switch (ran) {
        case 1: color = colorblue;
            break;
        case 2: color = colorYello;
            break;
        case 3: color = colorOrange;
            break;
        case 4: color = colorRose;
            break;
        case 5: color = colorGreen;
            break;
        case 6: color = colorDarkGreen;
            break;
        case 7: color = colorDarkYello;
            break;
        case 8: color = colorDarkblue;
            break;
        case 9: color = colorDarkOrange;
            break;
        case 10: color = colorRose;
            break;
        default:
            break;
    }

    return color;
}