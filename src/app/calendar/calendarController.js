const calendarProvider = require("../../app/calendar/calendarProvider");
const calendarService = require("../../app/calendar/calendarService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');

/**
 * API No. 16
 * API Name : 주간 캘린더 조회
 * [GET] /calendar/week
 */
exports.GetWeek = async function (req, res) {
    const userid = req.verifiedToken.userId;
    const date = req.params.date;

    const weekInfoResult = await calendarProvider.getWekekInfo(userid,date);
    return res.send(weekInfoResult);

};

/**
 * API No. 18
 * API Name : 캘린더에 직접 추가하기
 * [POST] /calendar/week/self/:date
 */
exports.PostSelf = async function (req, res) {
    const userid = req.verifiedToken.userId;
    const name = req.body.name;
    const date = req.params.date;
    const meal_time = req.body.meal_time;
    console.log(userid);

    if(!name){
        return res.send(errResponse(baseResponse.RECIPE_NAME_EMPTY));
    }

    const weekInfoResult = await calendarService.PostSelf(userid,name,date,meal_time);
    return res.send(weekInfoResult);

};