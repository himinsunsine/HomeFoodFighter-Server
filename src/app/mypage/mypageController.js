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
 * [GET] /mypages/favorite
 */
exports.FavoriteRecipe = async function (req, res) {
    const userid = req.verifiedToken.userId;

    const myFavoriteResult = await mypageProvider.getFavorites(userid);
    return res.send(myFavoriteResult);
    
};


/**
 * API No. 10
 * API Name : 내가 쓴 리뷰 조회 API
 * [GET] /mypages/review
 */
exports.GetMyReviews = async function (req, res) {
    const userid = req.verifiedToken.userId;

    const myReviewResult = await mypageProvider.getReviews(userid);
    return res.send(response(baseResponse.SUCCESS, myReviewResult));
};


/**
 * API No. 11
 * API Name : 내 레시피 조회 API
 * [GET] /mypages/myrecipe
 */
exports.GetMyRecipes = async function (req, res) {
    const userid = req.verifiedToken.userId;

    const myRecipeResult = await mypageProvider.getRecipes(userid);
    return res.send(response(baseResponse.SUCCESS, myRecipeResult));
};


/**
 * API No. 12
 * API Name : 회원 탈퇴 API
 * [GET] /mypages/withdrawal
 */
exports.WithdrawalUser = async function (req, res) {
    const userid = req.verifiedToken.userId;

    const updateStateResponse = await mypageService.changeUserState(
        userid,
    );
    return res.send(updateStateResponse);
};


// /**
//  * API No. 
//  * API Name : 로그아웃 API
//  * [GET] /mypages/logout
//  */
// exports.LogoutUser = async function (req, res) {
//     const token = req.headers['x-access-token'];
//     if (!token) {
//         return res.status(400).json({ error: '토큰이 전송되지 않았습니다.' });
//     }

//     // 쿠키를 삭제하여 로그아웃합니다.
//     res.clearCookie('token');

//     // 로그아웃 메시지를 응답합니다.
//     return res.status(200).json({ message: '로그아웃되었습니다.' });
// };


/**
 * API No. 1
 * API Name: 로그아웃 API
 * [GET] /mypages/logout
 */
exports.LogoutUser  = async function (req, res) {
    // 클라이언트에게 전송된 토큰이 쿠키로 설정되어 있으면, 해당 쿠키를 삭제합니다.
    if (req.cookies.token) {
      res.clearCookie('token');
    }
  
    // 로그아웃 메시지를 응답합니다.
    return res.status(200).json({ message: '로그아웃되었습니다.' });
  };
  