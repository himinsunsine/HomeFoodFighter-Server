const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const refrigeratorProvider = require("./refrigeratorProvider");
const refrigeratorDao = require("./refrigeratorDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.inquireRefrigerator = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await refrigeratorProvider.retrieveRefrigerator();
  
    connection.release();
    return result;
  };
  
  exports.fillRefrigerator = async function (itemInfo) {
    const connection = await pool.getConnection(async (conn) => conn);
    await refrigeratorDao.insertRefrigeratorItem(connection, itemInfo);
  
    connection.release();
  };
  
  exports.emptyRefrigerator = async function (itemInfo) {
    const connection = await pool.getConnection(async (conn) => conn);
    await refrigeratorDao.deleteRefrigeratorItem(connection, itemInfo);
  
    connection.release();
  };