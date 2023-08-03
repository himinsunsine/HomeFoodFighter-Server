const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const refrigeratorDao = require("./refrigeratorDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.fillRefrigerator = async function (arr) {
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const insertResult = await refrigeratorDao.insertRefrigerator(connection, arr);
        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.clearRefrigerator = async function (arr) {
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const removeResult = await refrigeratorDao.removeRefrigerator(connection, arr);
        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}