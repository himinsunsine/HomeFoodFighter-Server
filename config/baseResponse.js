module.exports = {
    // Success
    SUCCESS: { isSuccess: true, code: 1000, message: true },
  
    
    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
  
  
  }
  
  
    