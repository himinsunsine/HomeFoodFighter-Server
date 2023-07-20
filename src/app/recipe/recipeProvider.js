
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const recipeProvider = require("./recipeProvider");
const recipeDao = require("./recipeDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwtMiddleware = require('../../../config/jwtMiddleware');

//20. 상세레시피 조회
exports.getDetail = async function(recipe_id){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const recipeInfoResult = await recipeDao.selectDetailInfo(connection, recipe_id);
        const recipeProcessResult = await recipeDao.selectDetailProcess(connection, recipe_id);
        connection.release();

        recipeInfo=[recipeInfoResult, recipeProcessResult];
        return recipeInfo;
    }
    catch(err){
        logger.error(`App - editInfo Service error\n: ${err.message}`);
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
        return inquiryResult;
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

//39. 음식이름으로 레시피 조회
exports.FoodNameRecipe = async function(recipe_name){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.FoodNameRecipeInquiry(connection,recipe_name);
        console.log(`레시피 검색 완료`);
        console.log(inquiryResult);
        connection.release();

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}