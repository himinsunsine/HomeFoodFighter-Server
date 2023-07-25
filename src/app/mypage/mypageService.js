const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const mypageProvider = require("./mypageProvider");
const mypageDao = require("./mypageDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
const crypto = require("crypto");
const {connect} = require("http2");

exports.editPassword = async function (password_present, password_new, userid,) {
    try {
        // 비밀번호 존재 확인
        const passwordRows = await mypageProvider.passwordCheck(password_present, userid);
        if (passwordRows.length == 0)
            return errResponse(baseResponse.EDITING_PASSWORD_PRESENT_WRONG);

        const updatePasswordInfoParams = [password_new, userid];
        const connection = await pool.getConnection(async (conn) => conn);
        const editPasswordResult = await mypageDao.updatePasswordInfo(connection, updatePasswordInfoParams);

        console.log(`${userid}의 비밀번호 수정 완료`);
        connection.release();

        return res.send(response(baseResponse.SUCCESS_CHANGE_PASSWORD));

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.changeUserState = async function(userid){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const updateStateInfoResult = await mypageDao.changeState(connection, userid);
        console.log(`유저 탈퇴 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}