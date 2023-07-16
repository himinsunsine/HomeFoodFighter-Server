module.exports = function (app) {
    const recipe = require("./recipeController");
  
    //15. 레시피의 리뷰(후기) 등록하기
    app.post("/recipe/:recipe_id/review/:userid", recipe.PostRegisterReview);
    
    //34. 레시피전체 조회
    app.get("/recipe/all", recipe.allRecipeInquiry);
};