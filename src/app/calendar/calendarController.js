const calendarProvider = require("../../app/calendar/calendarProvider");
const calendarService = require("../../app/calendar/calendarService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');

// 날짜 형식이 유효한지 확인하는 함수
const isValidDate = (dateString) => {
    // 정규식을 사용하여 유효한 날짜 형식인지 확인합니다 (YYYY-MM-DD 형식)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(dateString) && !isNaN(Date.parse(dateString));
  };
  

/**
 * API No. 16
 * API Name : 주간 캘린더 조회
 * [GET] /calendar/week/:date
 */
exports.GetWeek = async function (req, res) {
    const userid = req.verifiedToken.userId;
    const date = req.params.date;

    // date 값이 유효한 날짜 형식인지 확인합니다.
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD format.' });
    }

    const weekInfoResult = await calendarProvider.getWeekInfo(userid,date);
    return res.send(weekInfoResult);

};

/**
 * API No. 17
 * API Name : 찜 이용하여 추가하기
 * [POST] /calendar/week/favorite/:date
 */
exports.PostFavorites = async function (req, res) {
    const userid = req.verifiedToken.userId;
    const date = req.params.date;
    const recipes = req.body.recipes;

    // date 값이 유효한 날짜 형식인지 확인합니다.
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD format.' });
    }

    const Info = [userid, date, recipes];

    const calendarInfoResult = await calendarService.postCalendar(Info);
    return res.send(calendarInfoResult);

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

    // date 값이 유효한 날짜 형식인지 확인합니다.
    if (!isValidDate(date)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD format.' });
    }

    if(!name){
        return res.send(errResponse(baseResponse.RECIPE_NAME_EMPTY));
    }

    const weekInfoResult = await calendarService.PostSelf(userid,name,date,meal_time);
    return res.send(weekInfoResult);

};

/**
 * API No. 29
 * API Name : 캘린더에서 레시피삭제
 * [POST] /calendar/week/self/:date
 */
exports.deleteWeekRecipe = async function (req, res) {
    const recipe_id = req.params.recipe_id;
    const userid = req.verifiedToken.userId;
    const bydate = req.body.bydate;
    const meal_time = req.body.meal_time;

    console.log(recipe_id,userid,bydate, meal_time);

    const Info = [recipe_id, userid, bydate, meal_time];



    // date 값이 유효한 날짜 형식인지 확인합니다.
    if (!isValidDate(bydate)) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD format.' });
    }
    //여기 다시확인
    if(!userid || !recipe_id || !bydate || !meal_time){
        return res.send(errResponse(baseResponse.RECIPE_NAME_EMPTY));
    }

    const weekdeleteResult = await calendarService.deleteRecipe(Info);
    return res.send(weekdeleteResult);

};