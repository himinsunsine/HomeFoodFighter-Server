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
    const RecipeQuery = `
    select * from Recipe
    `; 
    const recipeRows = await connection.query(RecipeQuery);
    return recipeRows[0];
}

module.exports = {
    allRecipeInquiry
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
}


module.exports = {
    TypeRecipeInquiry,
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