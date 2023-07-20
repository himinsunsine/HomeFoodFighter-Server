module.exports = function(app){
    const refrigerator = require('./refrigeratorController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 22. 냉장고 조회 API
    app.get('/refrigerator', refrigerator.inquire);

    // 23. 냉장고 채우기 API
    app.post('/refrigerator/fill', refrigerator.fill);
     
    // 24. 냉장고 비우기 API
    app.delete('/refrigerator/empty', refrigerator.empty)
  };