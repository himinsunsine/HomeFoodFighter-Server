const baseResponse = require("../../../config/baseResponse");

//API.16 주간 캘린더 조회
async function getWeek(connection, userid, date) {
    
    const getWeekQuery = `
    SELECT userid, recipe_id, DATE_FORMAT(bydate, '%Y-%m-%d') as bydate, meal_time, name FROM Calendar WHERE userid = ${userid} AND WEEK(bydate, 1) = WEEK('${date}', 1);
    `;
    const [weekRows] = await connection.query(getWeekQuery);
    return weekRows;
};

//API.17 찜에서 추가하기
async function insertCalendarFavorites(connection, Info) {
    
    const insertCalendarFavoritesQuery = `
    INSERT INTO Calendar (userid, recipe_id, bydate, meal_time, name)
    SELECT FR.userid, FR.recipe_id, '${Info[1]}', ${Info[3]}, R.recipe_name
    FROM FavoriteRecipes FR
    JOIN Recipe R ON FR.recipe_id = R.recipe_id
    WHERE FR.userid = ${Info[0]} AND FR.recipe_id =${Info[2]};
    `;
    const CalendarFavoritesRows = await connection.query(insertCalendarFavoritesQuery);
    return CalendarFavoritesRows;
};

//찜여부 조회하기
async function selectFavorite(connection, userid, recipe_id){
    const selectFavoriteQuery = `
    select id from FavoriteRecipes where userid=${userid} and recipe_id = ${recipe_id};
    `;
    const FavoriteRecipe_existence = await connection.query(selectFavoriteQuery);
    
    return FavoriteRecipe_existence[0];
}

//API.18 캘린더에서 직접 추가하기
async function insertRecipe(connection, userid, name, date, meal_time) {
    
    const getWeekQuery = `
    insert into Calendar(userid, name, bydate, meal_time) values(${userid},'${name}','${date}',${meal_time});
    `;
    const weekRows = await connection.query(getWeekQuery);
    return weekRows;
};

//API.29 캘린더에서 레시피 삭제
async function deleteCalendarWeek(connection, Info) {
//쿼리문짜기    
    const deleteWeekQuery = `
    DELETE FROM Calendar WHERE userid = ? AND bydate = ? AND meal_time = ?;
    `;
    const weekRemoveRows = await connection.query(deleteWeekQuery,Info);
    return weekRemoveRows;
};

module.exports={
    getWeek,
    insertRecipe,
    insertCalendarFavorites,
    deleteCalendarWeek,
    selectFavorite,
}