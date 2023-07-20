const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const refrigeratorDao = require("./refrigeratorDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveRefrigerator = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const refrigeratorResult = await refrigeratorDao.selectRefrigerator(connection);
    connection.release();
  
    return refrigeratorResult;
  };