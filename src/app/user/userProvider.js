const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const {connect} = require("http2");
const nodemailer = require("nodemailer");

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

exports.emailCheck = async function(email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();
  
    return emailCheckResult;
  }

exports.accountCheck = async function(id){
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, id);
    connection.release();
  
    return userAccountResult;
}

exports.GetIdInfoByEmail= async function(email){
    const connection = await pool.getConnection(async (conn) => conn);
    const idResult = await userDao.idGet(connection, email);
    connection.release();
  
    return idResult;
}

exports.GetPasswordInfoByEmail = async function(email){
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordResult = await userDao.passwordGet(connection, email);
  connection.release();

  return passwordResult;
}


exports.sendMail = async (mailOptions) => {
  // nodemailer 설정과 메일 발송
  // 메일 서버 설정 (Gmail 예시)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'himinsunsine@gmail.com', // 발송할 메일 계정
      pass: 'nbgtywuuwqicmakj', // 발송할 메일 계정의 비밀번호
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: ', mailOptions);
  } catch (error) {
    console.error('Error sending password reset email: ', error);
    throw error;
  }
};



