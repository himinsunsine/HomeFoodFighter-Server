const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const refrigeratorDao = require("./refrigeratorDao");

// Provider: Read 비즈니스 로직 처리