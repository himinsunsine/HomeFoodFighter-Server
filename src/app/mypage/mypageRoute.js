module.exports = function (app) {
  const jwtMiddleware = require('../../../config/jwtMiddleware');
  const mypage = require("./mypageController");
    
  //4. 비밀번호 변경 API
  app.post('/mypages/password', jwtMiddleware, mypage.patchPassword);
  
  //9. 찜한 레시피 조회
  app.get("/mypages/favorite", jwtMiddleware, mypage.getFavorite);

  //10. 내가 쓴 리뷰 조회 API
  app.get('/mypages/review', jwtMiddleware, mypage.GetMyReviews); 

  //11. 내 레시피 조회 API
  app.get('/mypages/myrecipe', jwtMiddleware, mypage.GetMyRecipes);     
  
  //12. 회원 탈퇴 API
  app.post('/mypages/withdrawal', jwtMiddleware, mypage.WithdrawalUser); 

  // 로그아웃 API
  app.get('/mypages/logout', jwtMiddleware, mypage.LogoutUser);
      
};