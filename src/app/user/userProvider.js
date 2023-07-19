const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {connect} = require("http2");

// Provider: Read 비즈니스 로직 처리
exports.idCheck = async function(id) {
    const connection = await pool.getConnection(async (conn) => conn);
    const idCheckResult = await userDao.selectUserId(connection, id);
    connection.release();
  
    return idCheckResult;
  }

exports.nicknameCheck = async function(nickname){
    const connection = await pool.getConnection(async (conn) => conn);
    const nicknameCheckResult = await userDao.selectUserNickname(connection, nickname);
    connection.release();
  
    return nicknameCheckResult;
  }

exports.passwordCheck = async function(selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(connection, selectUserPasswordParams);
    connection.release();
  
    return passwordCheckResult;
  }

exports.emailCheck = async function(selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(connection, selectUserPasswordParams);
    connection.release();
  
    return passwordCheckResult;
  }