const baseResponse = require("../../../config/baseResponse");

//API.16 주간 캘린더 조회
async function getWeek(connection, userid, date) {
    
    const getWeekQuery = `
    SELECT * FROM Calendar WHERE userid = ${userid} AND WEEK(bydate, 1) = WEEK('${date}', 1);
    `;
    const [weekRows] = await connection.query(getWeekQuery);
    return weekRows;
}
module.exports={
    getWeek,
}