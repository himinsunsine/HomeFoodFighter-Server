const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const mypageProvider = require("./mypageProvider");
const mypageDao = require("./mypageDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');
const {connect} = require("http2");

exports.passwordCheck = async function(password_present, userid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await mypageDao.selectUserPassword(connection, password_present, userid);
    console.log(passwordCheckResult);
    connection.release();
  
    return passwordCheckResult;
  }