module.exports = function(app){
    const refrigerator = require('./refrigeratorController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 22. 냉장고 조회 API
    app.get('/refrigerator/inquire', jwtMiddleware, refrigerator.GetRefrigerator);
    
    // 23. 냉장고 채우기 API
    app.post('/refrigerator/fill/:ingre_type', jwtMiddleware, refrigerator.FillRefrigerator);
     
    // 24. 냉장고 비우기 API
    //app.delete('/refrigerator/empty', refrigerator.EmptyRefrigerator)
  };