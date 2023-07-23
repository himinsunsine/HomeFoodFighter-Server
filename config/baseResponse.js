module.exports = {
    //HTTP 응답 코드 참고
    //https://www.zerocho.com/category/NodeJS/post/579b4ead062e76a002648af7

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },
    SUCCESS_ID : { "isSuccess": true, "code": 1001, "message":"사용 가능한 아이디입니다. " },
    SUCCESS_NICKNAME : { "isSuccess": true, "code": 1002, "message":"사용 가능한 닉네임입니다. " },
    SUCCESS_EMAIL : { "isSuccess": true, "code": 1003, "message":"사용 가능한 이메일입니다. " },
  
    //request error
    SIGNUP_ID_EMPTY : { "isSuccess": false, "code": 2001, "message":"아이디를 입력해주세요" },
    SIGNUP_ID_ERROR : { "isSuccess": false, "code": 2002, "message":"4~20자리/영문,숫자,특수문자’_’ 만 사용가능" },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2003, "message": "비밀번호를 입력해주세요." },
    SIGNUP_CHECK_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 한번 더 입력해주세요." },
    SIGNUP_PASSWORD_ERROR : { "isSuccess": false, "code": 2005, "message":"8~16자리/영문 대소문자,숫자,특수문자 조합" },
    SIGNUP_CHECK_PASSWORD_ERROR : { "isSuccess": false, "code": 2006, "message": "비밀번호가 일치하지 않습니다." }, 
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2007, "message":"닉네임을 입력해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2010,"message":"닉네임을 7자리 이하로 입력해주세요." },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2008, "message":"이름을 입력해주세요." },
    SIGNUP_NAME_LENGTH : { "isSuccess": false, "code": 2009, "message":"이름은 7자리 이하로 입력해주세요." }, 
    SIGNUP_BIRTH_EMPTY : { "isSuccess": false, "code": 2010, "message":"생년월일을 입력해주세요." },
    SIGNUP_BIRTH_ERROR : { "isSuccess": false, "code": 2011, "message":"생년월일을 정확하게 입력해주세요." },
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2012, "message":"이메일을 입력해주세요." },
    SIGNUP_EMAIL_ERROR : { "isSuccess": false, "code": 2013, "message":"이메일을 정확하게 입력해주세요." },

    EDITING_USERID_EMPTY: { "isSuccess": false, "code": 2500, "message": "사용자ID를 입력해주세요." },
    EDITING_PASSWORD_PRESENT_EMPTY: { "isSuccess": false, "code": 2014, "message": "현재 비밀번호를 입력해주세요." },
    EDITING_PASSWORD_NEW_EMPTY: { "isSuccess": false, "code": 2015, "message": "새 비밀번호를 입력해주세요." },
    EDITING_PASSWORD_CHECK_EMPTY: { "isSuccess": false, "code": 2016, "message": "새 비밀번호 확인을 입력해주세요." },
    EDITING_PASSWORD_PRESENT_LENGTH: { "isSuccess": false, "code": 2017, "message": "현재 비밀번호를 20자리 미만으로 입력해주세요." },
    EDITING_PASSWORD_NEW_LENGTH: { "isSuccess": false, "code": 2018, "message": "새 비밀번호를 20자리 미만으로 입력해주세요." },
    EDITING_PASSWORD_CHECK_LENGTH: { "isSuccess": false, "code": 2019, "message": "새 비밀번호 확인을 20자리 미만으로 입력해주세요." },



    CONTENT_EMPTY : { "isSuccess": false, "code": 2101, "message": "리뷰를 입력하세요"},
    STAR_CHECK1 : { "isSuccess": false, "code": 2102, "message": "별점이 0.5 미만입니다."},
    STAR_CHECK2 : { "isSuccess": false, "code": 2103, "message": "별점이 0.5 단위가 아닙니다."},


    TYPE_CHECK : {"isSucces":false, "code" : 2201, "messsage": "타입을 1이상 7이하의 값으로 입력해주세요."},


    // response error
    SIGNIN_ID_WRONG : { "isSuccess": false, "code": 3001, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3002, "message": "비밀번호가 잘못 되었습니다." },
    SIGNUP_REDUNDANT_ID : { "isSuccess": false, "code": 3003, "message":"중복된 아이디입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3004, "message":"중복된 닉네임입니다." },
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3005, "message":"중복된 이메일입니다." },
    SIGNIN_UNSIGN_USER : {"isSuccess": false, "code": 3006, "message": "이미 탈퇴한 유저입니다."},
    SIGNIN_UNSIGN_USER : {"isSuccess": false, "code": 3006, "message": "이미 탈퇴한 유저입니다."},
    FINDING_INFO_ERROR : {"isSuccess": false, "code": 3007, "message": "등록되지 않은 메일주소입니다. 다시 확인해주세요."},
    EDITING_PASSWORD_PRESENT_WRONG: { "isSuccess": false, "code": 3008, "message": "현재 비밀번호가 잘못 입력됐습니다." },
    EDITING_PASSWORD_DIFFERENT: { "isSuccess": false, "code": 3009, "message":"새 비밀번호를 동일하게 입력해주세요." },
    RECIPE_ID_EMPTY : {"isSuccess": false, "code": 3101, "message": "해당 레시피 id가 없습니다."},



    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
    TOKEN_EMPTY : { "isSuccess": false, "code": 4002, "message": "토큰을 입력해주세요"},
    TOKEN_VERIFICATION_FAILURE :  {"isSuccess": false, "code": 4003, "message": "토큰 검증에 실패했습니다."},

  }
  
  
    