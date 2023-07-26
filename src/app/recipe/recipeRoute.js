module.exports = function (app) {
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const recipe = require("./recipeController");
  
    //15. 레시피의 리뷰(후기) 등록하기
    app.post("/recipe/review/:recipe_id", jwtMiddleware, recipe.PostRegisterReview);

    //19. 인기 레시피 조회
    app.get("/recipe/highest-star", recipe.GetRecipeHot);
    
    //20. 레시피 상세 페이지 조회 
    app.get("/recipe/detail", recipe.GetDetail);

    //22. 레시피 찜하기 
    app.post("/recipe/favorite/:recipe_id", jwtMiddleware, recipe.Postfavorite);

    //25. 가능한 레시피 조회 API
    app.get('/recipe/possible', jwtMiddleware, recipe.possibleRecipe);
    
    //34. 레시피 전체조회 및 타입별 레시피 조회
    app.get("/recipe", recipe.GetallRecipe);

    //35. 음식이름으로 레시피 조회
    app.get("/recipe/name", jwtMiddleware, recipe.GetFoodNameRecipe);  
};