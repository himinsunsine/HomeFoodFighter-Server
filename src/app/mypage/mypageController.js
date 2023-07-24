const jwtMiddleware = require('../../../config/jwtMiddleware');
const mypageProvider = require("../../app/mypage/mypageProvider");
const mypageService = require("../../app/mypage/mypageService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const fs = require("fs");

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
    // 비밀번호 유효성 검사: 8~16자리/영문 대소문자,숫자,특수문자 조합
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  }

/**
 * API No. 4
 * API Name : 비밀번호 변경 API
 * [PATCH] /mypages/password
 * body : password
 */
exports.patchPassword = async function (req, res) {

    const userid = req.verifiedToken.userId;

    const password_present = req.body.password_present;
    const password_new = req.body.password_new;
    const password_check = req.body.password_check;

    if (!userid) return res.send(response(baseResponse.EDITING_USERID_EMPTY));

    // 비밀번호 입력값 빈칸 오류
    if (!password_present) return res.send(response(baseResponse.EDITING_PASSWORD_PRESENT_EMPTY));
    if (!password_new) return res.send(response(baseResponse.EDITING_PASSWORD_NEW_EMPTY));
    if (!password_check) return res.send(response(baseResponse.EDITING_PASSWORD_CHECK_EMPTY));

    if (password_present.length > 20) return res.send(response(baseResponse.EDITING_PASSWORD_PRESENT_LENGTH));
    if (password_new.length > 20) return res.send(response(baseResponse.EDITING_PASSWORD_NEW_LENGTH));
    if (password_check.length > 20) return res.send(response(baseResponse.EDITING_PASSWORD_CHECK_LENGTH));

    if (!validatePassword(password_new)) return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR));

    // 비밀번호 입력과 재입력값 비교
    if (password_new != password_check) 
        return res.send(response(baseResponse.EDITING_PASSWORD_DIFFERENT));
    else{
        const updatePasswordResponse = await mypageService.editPassword(
            password_present,
            password_new,
            userid,
        );
    
        return res.send(updatePasswordResponse);
    }
};

/**
 * API No. 9
 * API Name : 찜한 레시피 조회 API
 * [GET] /mypage/favorite
 */
exports.FavoriteRecipe = async function (req, res) {

    
};


/**
 * API No. 10
 * API Name : 내가 쓴 리뷰 조회 API
 * [GET] /mypages/review
 */
exports.GetMyReviews = async function (req, res) {
    const userid = req.verifiedToken.userId;

    const myRecipeResult = await mypageProvider.getMines(userid);
    return res.send(response(baseResponse.SUCCESS, myRecipeResult));
};


/**
 * API No. 11
 * API Name : 내 레시피 조회 API
 * [GET] /mypages/myrecipe
 */
exports.GetMyRecipes = async function (req, res) {
    const userid = req.verifiedToken.userId;

    const myRecipeResult = await mypageProvider.getMines(userid);
    return res.send(response(baseResponse.SUCCESS, myRecipeResult));
};


