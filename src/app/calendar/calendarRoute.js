module.exports = function (app) {
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const calendar = require("./calendarController");

    //16. 주간 캘린더 조회
    app.get("/calendar/week", jwtMiddleware, calendar.GetWeek);
    
};