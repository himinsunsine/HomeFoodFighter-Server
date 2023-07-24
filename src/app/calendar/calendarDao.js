const baseResponse = require("../../../config/baseResponse");

//API.16 주간 캘린더 조회
async function getWeek(connection, userid) {
    
    const getWeekQuery = `
    SELECT userid,recipe_id,bydate,meal_time FROM Calendar WHERE userid = ${userid} AND WEEK(bydate, 1) = WEEK(CURDATE(), 1);
    `;
    const [weekRows] = await connection.query(getWeekQuery);
    return weekRows;
}
module.exports={
    getWeek,
}