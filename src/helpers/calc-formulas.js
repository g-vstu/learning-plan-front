export function perWeek(perSemester, weeks) {
    // let ch = perSemester / weeks;
    // if (ch % 1 > 0.25) return Math.ceil(ch);
    // return Math.trunc(ch);
    return Math.round(perSemester / weeks + 0.25);
}
