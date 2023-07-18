
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const recipeProvider = require("./recipeProvider");
const recipeDao = require("./recipeDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");


//34. 전체레시피 조회
exports.allRecipe = async function(){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.allRecipeInquiry(connection);
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

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}




/*

//35. 한식 레시피 조회
exports.KoreaRecipe = async function(){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.KoreaRecipeInquiry(connection);
        console.log(`레시피 검색 완료`);
        connection.release();

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

//36. 일식 레시피 조회
exports.JapanRecipe = async function(){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.JapanRecipeInquiry(connection);
        console.log(`레시피 검색 완료`);
        connection.release();

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

//37. 중식 레시피 조회
exports.ChinaRecipe = async function(){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.ChinaRecipeInquiry(connection);
        console.log(`레시피 검색 완료`);
        connection.release();

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

//38. 양식 레시피 조회
exports.WesternRecipe = async function(){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.WesternRecipeInquiry(connection);
        console.log(`레시피 검색 완료`);
        connection.release();

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

//39. 음식이름으로 레시피 조회
exports.FoodNameRecipe = async function(Info){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const inquiryResult = await recipeDao.FoodNameRecipeInquiry(connection,Info);
        console.log(`레시피 검색 완료`);
        connection.release();

        return inquiryResult;
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}
*/