const baseResponse = require("../../../config/baseResponse");

//API.16 주간 캘린더 조회
async function getWeek(connection, userid, date) {
    
    const getWeekQuery = `
    SELECT * FROM Calendar WHERE userid = ${userid} AND WEEK(bydate, 1) = WEEK('${date}', 1);
    `;
    const [weekRows] = await connection.query(getWeekQuery);
    return weekRows;
};

//API.17 찜에서 추가하기
async function insertCalendarFavorites(connection, Info) {
    
    const getWeekQuery = `
    SELECT * FROM Calendar WHERE userid = ${userid} AND WEEK(bydate, 1) = WEEK('${date}', 1);
    `;
    const [weekRows] = await connection.query(getWeekQuery);
    return weekRows;
};

//API.18 캘린더에서 직접 추가하기
async function insertRecipe(connection, userid, name, date, meal_time) {
    
    const getWeekQuery = `
    insert into Calendar(userid, name, bydate, meal_time) values(${userid},'${name}','${date}',${meal_time});
    `;
    const weekRows = await connection.query(getWeekQuery);
    return weekRows;
};

module.exports={
    getWeek,
    insertRecipe,
    insertCalendarFavorites,
}