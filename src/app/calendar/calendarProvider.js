
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const calendarProvider = require("./calendarProvider");
const calendarDao = require("./calendarDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');


exports.getWekekInfo = async function(userid){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        const calendarWeek = await calendarDao.getWeek(connection,userid);
        connection.release();
        return response(baseResponse.SUCCESS, calendarWeek);

    }
    catch(err){
        logger.error(`App - getWeek Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}