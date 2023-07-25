const baseResponse = require("../../../config/baseResponse");

//API.15 레시피 리뷰 등록하기 
async function insertReview(connection, Info) {
    
    const registerReviewQuery = `
    insert into review(recipe_id,userid,star,content,createdAt) values(${Info[0]}, ${Info[1]}, ${Info[2]}, '${Info[3]}',now());
    `;
    const userRows = await connection.query(registerReviewQuery);
    return userRows[0];
}

//API.15 인기 레시피 조회
async function avgStar(connection){
    const avgStarQuery = `
    SELECT recipe_id, avg(star) FROM review GROUP BY recipe_id ORDER BY AVG(star) DESC;
    `;
    const [recipeRows] = await connection.query(avgStarQuery);
    return recipeRows;
}
//상위 x개 인기 레시피 조회
async function avgStarLimit(connection, limit){
    const avgStarQuery = `
    SELECT recipe_id, avg(star) FROM review GROUP BY recipe_id ORDER BY AVG(star) DESC LIMIT ${limit};
    `;
    const [recipeRows] = await connection.query(avgStarQuery);
    return recipeRows;
}


//API.20 상세 레시피 조회
//레시피 상세 정보 조회
async function selectDetailInfo(connection, recipe_id){
    const selectDetailQuery = `
    select recipe_id, userid, recipe_name, cook_time, difficulty, img_url from Recipe where recipe_id=${recipe_id};
    `;
    const [recipeInfoRows] = await connection.query(selectDetailQuery);
    return recipeInfoRows;
}

//레시피 과정 정보 조회
async function selectDetailProcess(connection, recipe_id){
    const selectDetailQuery = `
    select cook_order, description, order_img_url from process where recipe_id = ${recipe_id};
    `;
    const [recipeProcessRows] = await connection.query(selectDetailQuery);
    return recipeProcessRows;
}

//레시피의 재료 조회
async function Detailingre(connection, recipe_id){
    const detailingreQuery=`
    select recipe_id, DetailIngredient.ingre_id, ingre_name from DetailIngredient join ingredient i on i.ingre_id = DetailIngredient.ingre_id where recipe_id = ${recipe_id};
    `;
    const [recipeingre]= await connection.query(detailingreQuery);
    return recipeingre;
}

//레시피 존재 여부 조회
async function CheckRecipeExistence(connection,recipe_id){
    const recipeexistenceQuery = `
    select recipe_id from Recipe where recipe_id= ${recipe_id};
    `;
    const recipe_existence = await connection.query(recipeexistenceQuery);
    return recipe_existence[0];
}

//API.22 레시피 찜하기
async function insertFavorite(connection, userid,recipe_id){
    const insertFavoriteQuery = `
    insert into FavoriteRecipes(userid,recipe_id) values(${userid}, ${recipe_id});
    `;
    const recipe_favorite = await connection.query(insertFavoriteQuery);
    return recipe_favorite[0];
}
//찜여부 조회하기
async function selectFavorite(connection, userid, recipe_id){
    const selectFavoriteQuery = `
    select id from FavoriteRecipes where userid=${userid} and recipe_id = ${recipe_id};
    `;
    const FavoriteRecipe_existence = await connection.query(selectFavoriteQuery);
    return FavoriteRecipe_existence[0];
}

//API.25 가능한 레시피 조회
async function possibleRecipeInquiry(connection, ids){
    // info[12, 15]
    const possibleRecipeQuery = `
    SELECT* from Recipe where Recipe_id = (SELECT Recipe_id from DetailIngredient INNER JOIN refrigerator ON DetailIngredient.ingre_id = refrigerator.ingre_id where Detailingre_type = 1 AND DetailIngredient.ingre_id IN (${ids.map(id => '?').join(', ')} GROUP BY recipe_id));
    `; 
    const [recipeRows] = await connection.query(possibleRecipeQuery, ids);
    return recipeRows;
}

//API.34 레시피 전체 조회
async function allRecipeInquiry(connection) {
    const RecipeQuery = `
    select * from Recipe;
    `; 
    const recipeRows = await connection.query(RecipeQuery);
    return recipeRows[0];
}


//API.34 레시피 전체 조회  쿼리스트링으로 타입받아 조회하기
async function TypeRecipeInquiry(connection, RecipeType) {

    const KoreaRecipeQuery = `
    select * from Recipe where type_class = '${RecipeType}';
    `; 
    const [recipeRows] = await connection.query(KoreaRecipeQuery);
    return recipeRows;
    }


//API.34 음식이름으로 레시피 조회
async function FoodNameRecipeInquiry(connection, recipe_name){
    const FoodNameRecipeQuery = `
    select * from Recipe where recipe_name LIKE concat('%','${recipe_name}','%');
    `; 
    const [recipeRows] = await connection.query(FoodNameRecipeQuery);
    return recipeRows;
}
module.exports = {
    insertReview,
    avgStar,
    avgStarLimit,
    selectDetailInfo,
    selectDetailProcess,
    insertReview,
    allRecipeInquiry,
    TypeRecipeInquiry,
    FoodNameRecipeInquiry,
    allRecipeInquiry,
    CheckRecipeExistence,
    Detailingre,
    possibleRecipeInquiry,
    insertFavorite,
    selectFavorite,
}; 

/*API. 레시피 등록하기// 밑에 다시 확인하기 userRows
async function InsertRecipe(connection, Info) {
    
    const registerRecipeQuery = `
    insert into (recipe_id, userId, recipe_name, Summary, type_class, cook_time, difficulty, img_url, review) 
    values(${Info[0]}, ${Info[1]}, ${Info[2]}, ${Info[3]}, ${Info[4]}, ${Info[5]}, ${Info[6]}, ${Info[7]}, ${Info[8]});
    `;
    const userRows = await connection.query(registerReviewQuery);
    return userRows[0];
}


module.exports = {
    insertRecipe,
    
};*/