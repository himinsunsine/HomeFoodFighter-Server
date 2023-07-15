module.exports = {
    //HTTP 응답 코드 참고
    //https://www.zerocho.com/category/NodeJS/post/579b4ead062e76a002648af7

    // Success
    SUCCESS: { isSuccess: true, code: 200, message: true },
  
    //request error
    CONTENT_EMPTY : { "isSuccess": false, "code": 4001, "message": "리뷰를 입력하세요"},
    STAR_CHECK1 : { "isSuccess": false, "code": 4002, "message": "별점이 0.5 미만입니다."},
    STAR_CHECK2 : { "isSuccess": false, "code": 4003, "message": "별점이 0.5 단위가 아닙니다."},

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 500, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 500, "message": "서버 에러"},
  
  
  }
  
  
    