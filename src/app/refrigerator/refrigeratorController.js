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
    const refrigeratorResult = await refrigeratorProvider.inquireRefrigerator();
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
    const ingre_type = req.params.ingre_type;
    
    const arr = [userid, ingre_id, ingre_type];

    const FillResult = await refrigeratorService.fillRefrigerator(arr);
    return res.send(response(baseResponse.SUCCESS, FillResult));
};

/**
 * API No. 24
 * API Name : 냉장고 비우기 API
 * [PATCH] /refrigerator/empty
 */
/*exports.EmptyRefrigerator = async function (req, res) {
    const refrigeratorResult = await refrigeratorProvider.inquireRefrigerator();
    return res.send(response(baseResponse.SUCCESS, refrigeratorResult));
};*/