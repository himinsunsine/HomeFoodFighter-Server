module.exports = function (app) {
    const user = require("./userController");
  
    // 문자 인증 전송 API
    app.post('/users/send', user.send);
    // 문자 인증 검증 API
    app.post('/users/verify', user.verify);
     
  };