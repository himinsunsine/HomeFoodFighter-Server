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

exports.getReviews = async function(userid){
  try{
      const connection = await pool.getConnection(async (conn)=>conn);
      const myReviews = await mypageDao.selectMyReviews(connection, userid);
      connection.release();
      return myReviews;
  }
  catch(err){
      logger.error(`App - getReviews Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
  }
}

exports.getFavorites = async function(userid){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        const myFavorties = await mypageDao.selectMyFavorites(connection, userid);
        if(myFavorties==null){
            return response(baseResponse.FAVORITES_EMPTY)
        }
        connection.release();
        return response(baseResponse.SUCCESS, myFavorties);
    }
    catch(err){
        logger.error(`App - getFavorites Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.getRecipes = async function(userid){
  try{
      const connection = await pool.getConnection(async (conn)=>conn);
      const myRecipes = await mypageDao.selectMyRecipes(connection, userid);
      connection.release();
      return myRecipes;
  }
  catch(err){
      logger.error(`App - getRecipes Service error\n: ${err.message}`);
      return errResponse(baseResponse.DB_ERROR);
  }
}

exports.getuserinfo = async function(userid){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        const myuserinfo = await mypageDao.selectUserinfo(connection, userid);
        connection.release();
        return myuserinfo;
    }
    catch(err){
        logger.error(`App - getRecipes Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
  }