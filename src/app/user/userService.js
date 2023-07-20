const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

const crypto = require("crypto");
const {connect} = require("http2");

exports.createUser = async function (id, password, nickname, name, birth, email) {
    try{
        // 아이디 중복 확인
        const idRows = await userProvider.idCheck(id); // Read인 Provider 통해서 확인
        if (idRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_ID)

        // 닉네임 중복 확인
        const nicknameRows = await userProvider.nicknameCheck(nickname);
        if (nicknameRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
        
        // 이메일 중복 확인
        const emailRows= await userProvider.emailCheck(email);
        console.log(emailRows.length)
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
        
        // INSERT할 Params
        const insertUserParams = [id, password, nickname, name, birth, email];

        const connection = await pool.getConnection(async (conn) => conn);

        // Dao로 user를 실제로 insert
        const userIdResult = await userDao.insertUser(connection, insertUserParams);
        console.log(`추가된 회원: ${userIdResult[0]} `)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err){
        logger.error(`App - createMentor Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.postSignIn = async function(id, password) {
    try {
        // 아이디 존재 확인
        const idRows = await userProvider.idCheck(id);
        if (idRows.length < 1)
            return errResponse(baseResponse.SIGNIN_ID_WRONG);

        const selectId = idRows[0].id
        const selectUserPasswordParams = [selectId, password];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams)

        // DB에 있는 비밀번호와 입력된 비밀번호 값이 다르면 에러 메세지
        console.log(passwordRows[0], passwordRows[0][0].password, password)
        if (passwordRows[0][0].password !== password) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG)
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(id);

        // 0: 탈퇴, 1: 활성
        if (userInfoRows[0].status === 0) {
            return errResponse(baseResponse.SIGNIN_UNSIGN_USER);
        } 

        console.log(userInfoRows[0].userId)

        // 토큰 생성
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].userId,
            }, // 토큰 내용
            secret_config.jwtsecret, 
            // 유효기간 365일
            {
                expiresIn: "1h",
                subject: "user"
            }
        );
        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].userId, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.findInfo = async (email) => {
    // 이메일 존재 확인
    const emailRows= await userProvider.emailCheck(email);
    console.log(emailRows.length)
    if (emailRows.length == 0)
        return errResponse(baseResponse.FINDING_INFO_ERROR);    

    // 아이디 값 받아오기
    const idRows = await userProvider.GetIdInfoByEmail(email);

    // 비밀번호 값 받아오기
    const passwordRows = await userProvider.GetPasswordInfoByEmail(email);

    // 각각의 객체에서 필요한 정보만 추출하여 이메일 내용에 포함
    const idInfo = idRows.map((row) => row.id);
    const passwordInfo = passwordRows.map((row) => row.password);

    // 비밀번호 재설정 링크를 포함한 메일 옵션 설정
    const mailOptions = {
      from: 'himinsunsine@gmail.com', // 발송할 메일 계정
      to: email, // 회원의 이메일 주소
      subject: 'HomeFoodFighter', // 이메일 제목
    //   text: 'Please click the following link to reset your password: <reset_link_here>',
      text: `아이디는: ${idInfo.join(', ')}이고, 비밀번호는: ${passwordInfo.join(', ')}입니다.`, // 이메일 내용 (비밀번호 재설정 링크를 포함해야 함)
    };
    

    try {
      await userProvider.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
    return response(baseResponse.SUCCESS);
  };