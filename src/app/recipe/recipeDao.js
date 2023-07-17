//API.15 레시피 리뷰 등록하기 
async function insertReview(connection, Info) {
    
    const registerReviewQuery = `
    insert into review(recipe_id,userid,star,content,createdAt) values(${Info[0]}, ${Info[1]}, ${Info[2]}, '${Info[3]}',now());
    `;
    const userRows = await connection.query(registerReviewQuery);
    return userRows[0];
}


module.exports = {
    insertReview,
    
}; 

//API.34 레시피 전체 조회
async function allRecipeInquiry(connection) {
    const AllRecipeQuery = `select * from Recipe`; 
    const recipeRows = await connection.query(AllRecipeQuery);
    return recipeRows[0];
}


module.exports = {
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