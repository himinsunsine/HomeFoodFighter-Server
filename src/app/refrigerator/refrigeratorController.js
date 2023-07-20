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
exports.inquire = async function (req, res) {
  try {
    const result = await inquireRefrigerator();
    return response(res, 200, "냉장고 조회 성공", result);
  } catch (error) {
    console.error(error);
    return response(res, 500, "냉장고 조회 실패");
  }
};

/**
 * API No. 23
 * API Name : 냉장고 채우기 API
 * [POST] /refrigerator/fill
 */
exports.fill = async function (req, res) {
    try {
      const result = await fillRefrigerator(req.body);
      return response(res, 200, "냉장고 채우기 성공", result);
    } catch (error) {
      return errResponse(res, 500, "냉장고 채우기 실패");
    }
  };

/**
 * API No. 24
 * API Name : 냉장고 비우기 API
 * [PATCH] /refrigerator/empty
 */
exports.empty = async function (req, res) {
    try {
      const result = await emptyRefrigerator(req.body);
      return response(res, 200, "냉장고 비우기 성공", result);
    } catch (error) {
      return errResponse(res, 500, "냉장고 비우기 실패");
    }
  };
