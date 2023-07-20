const jwtMiddleware = require("../../../config/jwtMiddleware");
const refrigeratorProvider = require("../../app/refrigerator/refrigeratorProvider");
const refrigeratorService = require("../../app/refrigerator/refrigeratorService");
const baseResponse = require("../../../config/baseResponse");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 22
 * API Name : 냉장고 조회 API
 * [GET] /refrigerator
 */
exports.inquire = async (req, res) => {
};

/**
 * API No. 23
 * API Name : 냉장고 채우기 API
 * [POST] /refrigerator/fill
 */
exports.fill = async (req, res) => {
};

/**
 * API No. 24
 * API Name : 냉장고 비우기 API
 * [PATCH] /refrigerator/empty
 */
exports.empty = async (req, res) => {
};
