const jwtMiddleware = require("../../../config/jwtMiddleware");
const refrigeratorProvider = require("../../app/refrigerator/refrigeratorProvider");
const refrigeratorService = require("../../app/refrigerator/refrigeratorService");
const baseResponse = require("../../../config/baseResponse");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 22
 * API Name : 냉장고 조회 API
 * [GET] /refrigerator/inquire
 */
exports.GetRefrigerator = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const refrigeratorResult = await refrigeratorProvider.inquireRefrigerator(user_id);
    return res.send(response(baseResponse.SUCCESS, refrigeratorResult));
};
 

/**
 * API No. 23
 * API Name : 냉장고 채우기 API
 * [POST] /refrigerator/fill/:ingre_type
 */
exports.FillRefrigerator = async function (req, res) {
    const userid = req.verifiedToken.userId;
    const ingre_id = req.body.ingre_id;
    
    const arr = [userid, ingre_id];

    const FillResult = await refrigeratorService.fillRefrigerator(arr);
    return res.send(FillResult);
};

/**
 * API No. 24
 * API Name : 냉장고 비우기 API
 * [POST] /refrigerator/empty
 */
exports.EmptyRefrigerator = async function (req, res) {
    const userid = req.verifiedToken.userId;
    const ingre_id = req.body.ingre_id;
    
    const arr = [userid, ingre_id];

    const clearResult = await refrigeratorService.clearRefrigerator(arr);
    return res.send(clearResult);
};