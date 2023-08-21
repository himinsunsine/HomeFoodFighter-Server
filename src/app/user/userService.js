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
const {connect} = require("http2");
const crypto = require('crypto');
const axios = require("axios");
const { userInfo } = require("os");

// 비밀번호 해싱 함수
async function hashPassword(password,salt) {

  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}



// 아이디 중복 확인
exports.checkDuplicateId = async function (id) {
    const idRows = await userProvider.idCheck(id);
    return idRows.length > 0;
};

// 닉네임 중복 확인
exports.checkDuplicateNickname = async function (nickname) {
    const nicknameRows = await userProvider.nicknameCheck(nickname);
    return nicknameRows.length > 0;
};

// 이메일 중복 확인
exports.checkDuplicateEmail = async function (email) {
    const emailRows = await userProvider.emailCheck(email);
    return emailRows.length > 0;
};

exports.createUser = async function (id, password, nickname, name, birth, email,salt) {
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
        const insertUserParams = [id, password, nickname, name, birth, email,salt];

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
        // console.log(passwordRows[0][0]);
        const hashedPassword = await hashPassword(password, passwordRows[0][0].salt); 
        // DB에 있는 비밀번호와 입력된 비밀번호 값이 다르면 에러 메세지
        // console.log(passwordRows[0], passwordRows[0][0].password, password, hashedPassword)
        if (passwordRows[0][0].password !== hashedPassword) {
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
        console.log(err);
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
  









exports.signInKakaotoken = async (kakaoToken) => {
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    });
    const {data} = result
    const name = data.kakao_account.profile.nickname;
    const nickname = data.properties.nickname;
    const email = data.kakao_account.email;
    const kakaoId = data.id;
    const profileImage = data.properties.profile_image;
    const birthday = data.kakao_account.birthday;

    const month = birthday.substr(0, 2);
    const day = birthday.substr(2, 2);
  
    // 현재 연도를 가져옴 카카오는 월일만 제공함으로 임시로 현재 연도를 넣었음
    const currentYear = new Date().getFullYear();
  
    // 'MMDD' 형식을 Date 형식으로 변환
    const birthDate = new Date(`${currentYear}-${month}-${day}`);
    

    if (!name){
        return errResponse(baseResponse.KAKAO_NAME_EMPTY);
    }else if (!email){
        return errResponse(baseResponse.KAKAO_EMAIL_EMPTY);
    }else if (!kakaoId){
        return errResponse(baseResponse.KAKAO_ID_EMPTY);
    }else if (!birthday){
        return errResponse(baseResponse.KAKAO_BIRTY_EMPTY);
    }

    const connection = await pool.getConnection(async (conn) => conn);
    const userInfoRows = await userDao.kakaogetUserById(connection, kakaoId);
    console.log(userInfoRows);
    const Info = [name, nickname, email, kakaoId, profileImage, birthDate];
    console.log(Info);
    if (!userInfoRows || userInfoRows.length === 0) {
        await userDao.kakaosignUp(connection, Info);
    }
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
        return response(baseResponse.SUCCESS, {'user_id' : userInfoRows[0].userId, 'jwt': token});
    
};



exports.editNickname = async function (nickname, userid) {
    try {
        const updateNicknameInfoParams = [nickname, userid];
        const connection = await pool.getConnection(async (conn) => conn);
        const editNicknameResult = await userDao.updateNicknameInfo(connection, updateNicknameInfoParams);

        console.log(`${userid}의 닉네임 수정 완료`);
        connection.release();

        return response(response(baseResponse.SUCCESS));

    } catch (err) {
        logger.error(`App - editUserNickname Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}