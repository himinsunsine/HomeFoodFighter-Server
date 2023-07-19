const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponse");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const crypto = require("crypto");
const {connect} = require("http2");

exports.createUser = async function (id, password, nickname, name, birth, email) {
    try{
        // // 아이디 중복 확인
        // const idRows = await userProvider.idCheck(id); // Read인 Provider 통해서 확인
        // if (idRows.length > 0)
        //     return errResponse(baseResponse.SIGNUP_REDUNDANT_ID)

        // // 닉네임 중복 확인
        // const nicknameRows = await userProvider.nicknameCheck(nickname);
        // if (nicknameRows.length > 0)
        //     return errResponse(baseResponse.SIGNUP_REDUNDANT_NICKNAME);
        
        // // 이메일 중복 확인
        // const findeEmailResponse = await userProvider.emailCheck(email);
        // console.log(findeEmailResponse.length)
        // if (findeEmailResponse.length > 0)
        //     return res.send(errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL));
        
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