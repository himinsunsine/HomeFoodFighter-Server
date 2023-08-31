module.exports = function (app) {
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const recipe = require("./recipeController");
  
    //13~14. 인기 레시피 조회
    app.get("/recipe/highest-star", recipe.GetRecipeHot);

    //15. 레시피의 리뷰(후기) 등록하기
    app.post("/recipe/review/:recipe_id", jwtMiddleware, recipe.PostRegisterReview);

    //19. 레시피 찜 취소하기
    app.post("/recipe/favorite/delete/:recipe_id", jwtMiddleware, recipe.Deletefavorite);
    
    //20. 레시피 상세 페이지 조회 
    app.get("/recipe/detail/:recipe_id", recipe.GetDetail);

    //30. 토큰 + 레시피 상세 페이지 조회 
    app.get("/recipe/detail/login/:recipe_id", jwtMiddleware,recipe.GetDetailwithToken);

    //21. 레시피 찜하기 
    app.post("/recipe/favorite/:recipe_id", jwtMiddleware, recipe.Postfavorite);  

    //25. 가능한 레시피 조회 API
    app.get('/recipe/possible', recipe.possibleRecipe);

    //26. 레시피의 리뷰 조회
    app.get("/recipe/review/:recipe_id", recipe.getReview);
    
    //33~34. 레시피 전체조회 및 타입별 레시피 조회
    app.get("/recipe", recipe.GetallRecipe);

    //35. 음식이름으로 레시피 조회
    app.get("/recipe/name", recipe.GetFoodNameRecipe);  
};