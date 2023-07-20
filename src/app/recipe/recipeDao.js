const baseResponse = require("../../../config/baseResponse");

//API.15 레시피 리뷰 등록하기 
async function insertReview(connection, Info) {
    
    const registerReviewQuery = `
    insert into review(recipe_id,userid,star,content,createdAt) values(${Info[0]}, ${Info[1]}, ${Info[2]}, '${Info[3]}',now());
    `;
    const userRows = await connection.query(registerReviewQuery);
    return userRows[0];
}

//상위 x개 레시피의 별점 평균 조회
async function avgStar(connection, Info){
    const avgStarQuery = `
    SELECT recipe_id, avg(star) FROM review GROUP BY recipe_id ORDER BY AVG(star) DESC LIMIT ${Info[0]};
    `;
}

//레시피 상세 정보 조회
async function selectDetailInfo(connection, recipe_id){
    const selectDetailQuery = `
    select recipe_id, userid, recipe_name, cook_time, difficulty, img_url from Recipe where recipe_id=?;
    `;
    const [recipeInfoRows] = await connection.query(selectDetailQuery);
    return recipeInfoRows;
}

//레시피 과정 정보 조회
async function selectDetailProcess(connection, recipe_id){
    const selectDetailQuery = `
    select cook_order, description, order_img_url from process where recipe_id = ?;
    `;
    const [recipeProcessRows] = await connection.query(selectDetailQuery);
    return recipeProcessRows;
}

//API.34 레시피 전체 조회
async function allRecipeInquiry(connection) {
    const RecipeQuery = `
    select * from Recipe
    `; 
    const recipeRows = await connection.query(RecipeQuery);
    return recipeRows[0];
}


//API.34 레시피 전체 조회  쿼리스트링으로 타입받아 조회하기
async function TypeRecipeInquiry(connection, RecipeType) {
    if ( RecipeType == '1'){
        const KoreaRecipeQuery = `
        select * from Recipe where type_class = '1'
        `; 
        const recipeRows = await connection.query(KoreaRecipeQuery);
        return recipeRows[0];
    }
    
    else if(RecipeType == '2'){
        const JapanRecipeQuery = `
        select * from Recipe where type_class = '2'
        `; 
        const recipeRows = await connection.query(JapanRecipeQuery);
        return recipeRows[0];
    }
    
    else if(RecipeType == '3'){
        const ChinaRecipeQuery = `
        select * from Recipe where type_class = '3'
        `; 
        const recipeRows = await connection.query(ChinaRecipeQuery);
        return recipeRows[0];
    }

    else if(RecipeType == '4'){
        const WesternRecipeQuery = `
        select * from Recipe where type_class = '4' OR type_class = '5'
        `; 
        const recipeRows = await connection.query(WesternRecipeQuery);
        return recipeRows[0];
    }
    else if(RecipeType == '5'){
        const AsiaernRecipeQuery = `
        select * from Recipe where type_class = '6'
        `; 
        const recipeRows = await connection.query(AsiaRecipeQuery);
        return recipeRows[0];
    }
    else if(RecipeType == '6'){
        const FusionRecipeQuery = `
        select * from Recipe where type_class = '7'
        `; 
        const recipeRows = await connection.query(FusionRecipeQuery);
        return recipeRows[0];
    }
    else if(RecipeType == '7'){
        const DesertRecipeQuery = `
        select * from Recipe where type_class = '8'
        `; 
        const recipeRows = await connection.query(DesertRecipeQuery);
        return recipeRows[0];
    }
    else{
        return null;
    }

}

//API.34 음식이름으로 레시피 조회
async function FoodNameRecipeInquiry(connection, recipe_name){
    const FoodNameRecipeQuery = `
    select * from Recipe where recipe_name LIKE concat('%','${recipe_name}','%')
    `; 
    const recipeRows = await connection.query(FoodNameRecipeQuery);
    return recipeRows[0];
}
module.exports = {
    insertReview,
    avgStar,
    selectDetailInfo,
    selectDetailProcess,
    insertReview,
    allRecipeInquiry,
    TypeRecipeInquiry,
    FoodNameRecipeInquiry,
    allRecipeInquiry,
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