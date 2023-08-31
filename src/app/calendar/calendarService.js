const jwtMiddleware = require('../../../config/jwtMiddleware');
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const calendarProvider = require("./calendarProvider");
const calendarDao = require("./calendarDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwt = require("jsonwebtoken");

//18. 캘린더에서 직접 추가하기
exports.PostSelf = async function(userid,name,date,meal_time){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const registerResult = await calendarDao.insertRecipe(connection, userid,name,date,meal_time);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};

exports.postCalendar = async function(Info){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);
        const favoriteexistenceResult = await calendarDao.selectFavorite(connection, Info[0], Info[2]);
        //console.log(favoriteexistenceResult);
        if(favoriteexistenceResult[0] == null) {
            return errResponse(baseResponse.FAVORITE_NOT_EXISTENCE);
        } 
        const calendarResult = await calendarDao.insertCalendarFavorites(connection, Info);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};

// API 29번 캘린더에서 레시피 삭제
exports.deleteRecipe = async function(Info){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);
        const calendarResult = await calendarDao.deleteCalendarWeek(connection, Info);
        connection.release();
        console.log(calendarResult);

        if (calendarResult[0].affectedRows === 0) {
            
            return errResponse(baseResponse.CALENDAR_RECIPE_EMPTY);
        }
        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};