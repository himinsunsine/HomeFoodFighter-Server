
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const recipeProvider = require("./recipeProvider");
const recipeDao = require("./recipeDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');

//19. 인기 레시피 조회 (모두 출력)
exports.getRecipeHot = async function(){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        const recipeHot = await recipeDao.avgStar(connection);
        connection.release();
        return response(baseResponse.SUCCESS,recipeHot);

    }
    catch(err){
        logger.error(`App - getRecipeHot Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
//인기 레시피 조회 (개수 제한)
exports.getRecipeHotLimit = async function(limit){
    try{
        const connection = await pool.getConnection(async (conn)=>conn);
        const recipeHot = await recipeDao.avgStarLimit(connection,limit);
        connection.release();
        return response(baseResponse.SUCCESS,recipeHot);

    }
    catch(err){
        logger.error(`App - getRecipeHot Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//20. 상세 레시피 조회
exports.getDetail = async function(recipe_id){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const recipe_existence = await recipeDao.CheckRecipeExistence(connection,recipe_id);
        console.log(recipe_existence);
        if (recipe_existence[0]==null){
            return errResponse(baseResponse.RECIPE_ID_EMPTY);
        } else{
            const recipeInfoResult = await recipeDao.selectDetailInfo(connection, recipe_id);
            const recipeProcessResult = await recipeDao.selectDetailProcess(connection, recipe_id);
            const recipeIngreResult = await recipeDao.Detailingre(connection,recipe_id);
            
            connection.release();

            recipeInfo=[recipeInfoResult, recipeProcessResult, recipeIngreResult];
            return response(baseResponse.SUCCESS,recipeInfo);
        }

        
    }
    catch(err){
        logger.error(`App - getRecipeInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//30. 토큰 + 상세 레시피 조회
exports.getDetailwithToken= async function(recipe_id,userid){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        const recipe_existence = await recipeDao.CheckRecipeExistence(connection,recipe_id);
        var favoriteResult = 0
        if (recipe_existence[0]==null){
            return errResponse(baseResponse.RECIPE_ID_EMPTY);
        } else{
            const recipeInfoResult = await recipeDao.selectDetailInfo(connection, recipe_id);
            const recipeProcessResult = await recipeDao.selectDetailProcess(connection, recipe_id);
            const recipeIngreResult = await recipeDao.Detailingre(connection,recipe_id);
            const selectFavoriteResult = await recipeDao.selectFavorite(connection,userid,recipe_id);
            connection.release();
            if (selectFavoriteResult[0]==null){
                favoriteResult = false
            }
            else{
                favoriteResult = true
            }
            recipeInfo=[recipeInfoResult, recipeProcessResult, recipeIngreResult,favoriteResult];
            return response(baseResponse.SUCCESS,recipeInfo);
        }

        
    }
    catch(err){
        logger.error(`App - getRecipeInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//25. 가능한 레시피 조회
exports.getpossible = async function(ingredient_id){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.possibleRecipeInquiry(connection,ingredient_id);
        console.log(`레시피 검색 완료`);
        console.log(inquiryResult);
        connection.release();

        return response(baseResponse.SUCCESS, inquiryResult);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

//26. 레시피의 리뷰 조회하기
exports.getAllReivew = async function(recipe_id){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const ReviewResult = await recipeDao.selectAllReview(connection, recipe_id)

        connection.release();
        return response(baseResponse.SUCCESS,ReviewResult);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        console.log(err)
        return errResponse(baseResponse.DB_ERROR);
    }
}

//34. 전체레시피 조회
exports.allRecipe = async function(){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.allRecipeInquiry(connection)
        console.log(`레시피 검색 완료`);
        connection.release();
        return response(baseResponse.SUCCESS,inquiryResult);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        console.log(err)
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.TypeRecipe = async function(RecipeType){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.TypeRecipeInquiry(connection,RecipeType);
        console.log(`레시피 검색 완료`);
        connection.release();

        return response(baseResponse.SUCCESS, inquiryResult);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//35. 음식이름으로 레시피 조회
exports.FoodNameRecipe = async function(recipe_name){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.FoodNameRecipeInquiry(connection,recipe_name);
        console.log(`레시피 검색 완료`);
        console.log(inquiryResult);
        connection.release();

        return response(baseResponse.SUCCESS, inquiryResult);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}