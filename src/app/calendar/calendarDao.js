const baseResponse = require("../../../config/baseResponse");

//API.16 주간 캘린더 조회
async function getWeek(connection, userid, date) {
    
    const getWeekQuery = `
    SELECT userid, recipe_id, DATE_FORMAT(bydate, '%Y-%m-%d'), meal_time, name FROM Calendar WHERE userid = ${userid} AND WEEK(bydate, 1) = WEEK('${date}', 1);
    `;
    const [weekRows] = await connection.query(getWeekQuery);
    return weekRows;
};

//API.17 찜에서 추가하기
async function insertCalendarFavorites(connection, Info) {
    
    const insertCalendarFavoritesQuery = `
    INSERT INTO Calendar (userid, recipe_id, bydate, meal_time, name)
    SELECT FR.userid, FR.recipe_id, '${Info[1]}', 2, R.recipe_name
    FROM FavoriteRecipes FR
    JOIN Recipe R ON FR.recipe_id = R.recipe_id
    WHERE FR.userid = ${Info[0]} AND FR.recipe_id =${Info[2]};
    `;
    const CalendarFavoritesRows = await connection.query(insertCalendarFavoritesQuery);
    return CalendarFavoritesRows;
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