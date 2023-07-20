module.exports = function (app) {
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const recipe = require("./recipeController");
  
    //15. 레시피의 리뷰(후기) 등록하기
    app.post("/recipe/review/:recipe_id", jwtMiddleware, recipe.PostRegisterReview);

    //19. 인기 레시피 조회
    app.get("/recipe/highest-star", recipe.GetRecipeHot);
    
    //20. 레시피 상세 페이지 조회 
    app.get("/recipe/detail", jwtMiddleware, recipe.GetDetail);
    
    //34. 전체 레시피 조회
    app.get("/recipe", jwtMiddleware, recipe.GetallRecipe);

    //39. 음식이름으로 레시피 조회
    app.get("/recipe/name", jwtMiddleware, recipe.GetFoodNameRecipe);  
};