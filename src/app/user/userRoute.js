const jwtMiddleware = require('../../../config/jwtMiddleware');

module.exports = function (app) {
    const user = require("./userController");
  
    // 2. 회원 가입 API
    app.post('/users/signup', user.postSignUpMentor);

    // 1. 로그인 API (JWT 생성)
    app.post('/users/login', user.login);
     
    // 3. 아이디/비밀번호 찾기 API
    app.post('/users/finding', user.finding)
  };