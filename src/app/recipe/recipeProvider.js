//34. 전체레시피 조회
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const recipeProvider = require("./recipeProvider");
const recipeDao = require("./recipeDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");



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
        return errResponse(baseResponse.DB_ERROR);
    }
}