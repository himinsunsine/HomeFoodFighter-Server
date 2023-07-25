module.exports = function (app) {
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const calendar = require("./calendarController");

    //16. 주간 캘린더 조회
    app.get("/calendar/week/:date", jwtMiddleware, calendar.GetWeek);
    
    //18. 캘린더에서 직접 추가하기
    app.post("/calendar/week/self/:date", jwtMiddleware, calendar.PostSelf);
    
};