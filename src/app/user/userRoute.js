module.exports = function (app) {
    const user = require("./userController");
  
    // 2. 회원 가입 API
    app.post('/users/signup', user.postSignUpMentor);
     
  };