const mypageProvider = require("../../app/mypage/mypageProvider");
const mypageService = require("../../app/mypage/mypageService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const fs = require("fs");

/**
 * API No. 9
 * API Name : 찜한 레시피 조회
 * [GET] /mypage/favorite
 */
exports.FavoriteRecipe = async function (req, res) {
    const recipe_id = req.params.recipe_id;
    const userid = req.params.userid;
    const star = req.body.star;
    const content = req.body.content;

    console.log(recipe_id,userid,star);

    const Info = [recipe_id, userid, star, content];

    // 빈 값 체크
    if(!content){
        return res.send(errResponse(baseResponse.CONTENT_EMPTY));
    }

    //최소 별점 값 체크
    if(star<0.5){
        return res.send(errResponse(baseResponse.STAR_CHECK1));
    }
    else{ // 0.5 단위 체크
        if(star % 0.5 != 0){
            return res.send(errResponse(baseResponse.STAR_CHECK2));
        }
    }
    const ReviewInfoResult = await recipeService.registerReview(Info);
    return res.send(ReviewInfoResult);

};