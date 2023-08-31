const jwtMiddleware = require('../../../config/jwtMiddleware');

module.exports = function (app) {
    const user = require("./userController");
  
    // 2. 회원 가입 API
    app.post('/users/signup', user.postSignUp);

    // 1. 로그인 API (JWT 생성)
    app.post('/users/login', user.login);
    
    // 3. 아이디/비밀번호 찾기 API
    app.post('/users/finding', user.finding);

    // ID 유효성 검사 및 중복 검사 API
    app.get('/users/check/duplicate/Id/:id', user.checkDuplicateId);

    // NICKNAME 유효성 검사 및 중복 검사 API
    app.get('/users/check/duplicate/nickname/:nickname', user.checkDuplicateNickname);
 
    // EMAIL 유효성 검사 및 중복 검사 API
    app.get('/users/check/duplicate/email/:email', user.checkDuplicateEmail);

    // kakaologin API
    app.post('/users/kakao/signin', user.signInKakao);

    // 닉네임 변경
    app.post('/users/:nickname', jwtMiddleware, user.patchNickname);
  };