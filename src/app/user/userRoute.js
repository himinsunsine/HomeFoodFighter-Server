module.exports = function (app) {
    const user = require("./userController");
  
    //1. 유저 생성 api
    app.post("/app/users", user.sign_up);
    
    
  };
  