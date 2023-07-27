const jwtMiddleware = require('../../../config/jwtMiddleware');
const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const recipeProvider = require("./recipeProvider");
const recipeDao = require("./recipeDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwt = require("jsonwebtoken");

//15. 레시피의 리뷰(후기) 등록하기
exports.registerReview = async function(Info){
    try{
        
        const connection = await pool.getConnection(async (conn)=> conn);

        const registerResult = await recipeDao.insertReview(connection, Info);
        console.log(`후기 등록 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//21. 레시피 찜하기
exports.favoriteRecipe = async function(userid,recipe_id){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const favoriteexistenceResult = await recipeDao.selectFavorite(connection, userid,recipe_id);
        console.log(favoriteexistenceResult);
        if(favoriteexistenceResult[0] == null) {
            const favoriteResult = await recipeDao.insertFavorite(connection, userid,recipe_id);
        } else {
            return response(baseResponse.FAVORITE_EXISTENCE);
        }
        
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

//19. 레시피 찜 취소하기
exports.DeletefavoriteRecipe = async function(userid, recipe_id){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);

        const favoriteexistenceResult = await recipeDao.selectFavorite(connection, userid,recipe_id);
        console.log(favoriteexistenceResult);
        if(favoriteexistenceResult[0] == null) {
            return response(baseResponse.FAVORITE_NOT_EXISTENCE);
        } else {
            
            const favoriteResult = await recipeDao.deleteFavorite(connection, userid,recipe_id);
        }
        
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}