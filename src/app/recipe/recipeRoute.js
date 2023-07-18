module.exports = function (app) {
    const recipe = require("./recipeController");
  
    //15. 레시피의 리뷰(후기) 등록하기
    app.post("/recipe/:recipe_id/review/:userid", recipe.PostRegisterReview);
    
    //34. 전체 레시피 조회
    app.get("/recipe", recipe.GetallRecipe);

    /*
    //35. 한식 레시피 조회
    app.get("recipe?recipe_type=korea", recipe.GetKoreaRecipe);

    //36. 일식 레시피 조회
    app.get("/recipe?recipe_type=japan", recipe.GetJapanRecipe);

    //37. 중식 레시피 조회
    app.get("/recipe/china", recipe.GetChinaRecipe);

    //38. 양식 레시피 조회
    app.get("/recipe/western", recipe.GetWesternRecipe);
  */  
    //39. 음식이름으로 레시피 조회
    //app.get("/recipe/:recipe_name", recipe.GetFoodNameRecipe);  
};