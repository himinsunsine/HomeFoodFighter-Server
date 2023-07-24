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

    const weekInfoResult = await calendarProvider.getWekekInfo(userid);
    return res.send(weekInfoResult);

};