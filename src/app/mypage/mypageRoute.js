module.exports = function (app) {
  const jwtMiddleware = require('../../../config/jwtMiddleware');
  const mypage = require("./mypageController");
    
  //4. 비밀번호 변경 API
  app.post('/users/password', jwtMiddleware, mypage.patchPassword);
  
  //9. 찜한 레시피 조회
  app.get("/mypages/favorite", jwtMiddleware, mypage.getFavorite);

  //10. 내가 쓴 리뷰 조회 API
  app.get('/mypages/review', jwtMiddleware, mypage.GetMyReviews); 

  //11. 내 레시피 조회 API
  app.get('/mypages/myrecipe', jwtMiddleware, mypage.GetMyRecipes);     
  
  //12. 회원 탈퇴 API
  app.post('/users/withdrawal', jwtMiddleware, mypage.WithdrawalUser); 

  //27. 리뷰 삭제 API
  app.post('/mypages/review/delete', jwtMiddleware, mypage.deleteReview);

  // 로그아웃 API
  app.get('/users/logout', jwtMiddleware, mypage.LogoutUser);
};