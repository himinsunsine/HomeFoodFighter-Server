module.exports = function (app) {
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const calendar = require("./calendarController");

    //16. 주간 캘린더 조회
    app.get("/calendar/week/:date", jwtMiddleware, calendar.GetWeek);

    //17. 찜 이용하여 추가하기
    app.post("/calendar/week/favorite/:date", jwtMiddleware, calendar.PostFavorites);
    
    //18. 캘린더에서 직접 추가하기
    app.post("/calendar/week/self/:date", jwtMiddleware, calendar.PostSelf);

    //29. 캘린더에서 레시피삭제
    app.delete("/calendar/week", jwtMiddleware, calendar.deleteWeekRecipe);
    
};