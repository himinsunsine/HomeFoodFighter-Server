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

        const calendarResult = await calendarDao.insertCalendarFavorites(connection, Info);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

};