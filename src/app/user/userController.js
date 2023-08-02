const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const crypto = require('crypto');

/**
 * 입력 형식 검사
 */

// 생년월일이 유효한지 확인하는 함수 (YYYYMMDD 형식)
function isValidDate(dateString) {
  const regEx = /^\d{8}$/;
  if (!dateString.match(regEx)) return false; // 형식 검사

  const year = dateString.substr(0, 4);
  const month = dateString.substr(4, 2);
  const day = dateString.substr(6, 2);
  
  const d = new Date(year, parseInt(month) - 1, day);
  return d.getFullYear() == year && d.getMonth() + 1 == month && d.getDate() == day;
}

// 아이디 유효성 검사 함수
function validateUsername(id) {
  // 아이디 유효성 검사: 4~20자리/영문,숫자,특수문자’_’ 만 사용가능
  const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
  return usernameRegex.test(id);
}

// 비밀번호 유효성 검사 함수
function validatePassword(password) {
  // 비밀번호 유효성 검사: 8~16자리/영문 대소문자,숫자,특수문자 조합
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordRegex.test(password);
}


function validateEmail(email) {
  // 이메일 유효성 검사를 위한 정규표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/;
  return emailRegex.test(email);
}


// // 이메일 유효성 검사 함수
// function validateEmail(email) {
//   // 이메일 유효성 검사를 위한 정규표현식
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return emailRegex.test(email);
// }


/**
 * 입력 중복 검사
 */

// 아이디 중복 확인 API
exports.checkDuplicateId = async function (req, res) {
  const { id } = req.params;

  // 유효성 검사 등 추가적인 로직 수행
  if (!id)
      return res.send(response(baseResponse.SIGNUP_ID_EMPTY));
  if (!validateUsername(id))
      return res.send(response(baseResponse.SIGNUP_ID_ERROR));

  try {
      const isDuplicateId = await userService.checkDuplicateId(id);
      if(isDuplicateId==0)
        return res.send(response(baseResponse.SUCCESS_ID));
      else
        return res.send(response(baseResponse.SIGNUP_REDUNDANT_ID));
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// 닉네임 중복 확인 API
exports.checkDuplicateNickname = async function (req, res) {
  const { nickname } = req.params;

  // 유효성 검사 등 추가적인 로직 수행
  if (!nickname)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
  if (nickname.length > 7)
    return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));  

  try {
      const isDuplicateNickname = await userService.checkDuplicateNickname(nickname);
      if(isDuplicateNickname==0)
        return res.send(response(baseResponse.SUCCESS_NICKNAME));
      else
        return res.send(response(baseResponse.SIGNUP_REDUNDANT_NICKNAME));
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// 이메일 중복 확인 API
exports.checkDuplicateEmail = async function (req, res) {
  const { email } = req.params;

  // 유효성 검사 등 추가적인 로직 수행
  if (!email)
    return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
  if (!validateEmail(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR));    

  try {
      const isDuplicateEmail = await userService.checkDuplicateEmail(email);
      if(isDuplicateEmail==0)
        return res.send(response(baseResponse.SUCCESS_EMAIL));
      else
        return res.send(response(baseResponse.SIGNUP_REDUNDANT_EMAIL));
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

/**
 * API No. 2
 * API Name : 회원 가입 API
 * [POST] /users/signup
 */
exports.postSignUp = async function (req, res) {
  const {id, password, check_password, nickname, name, birth, email, agreed_to_terms } = req.body; // agreed_to_terms도 추가해줘야함.

   // 아이디 중복 확인 API 호출
   try {
    const idDuplicateResponse = await userService.checkDuplicateId(id);
    if (idDuplicateResponse.isDuplicate)
      return res.send(response(baseResponse.SIGNUP_DUPLICATED_ID));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  // 닉네임 중복 확인 API 호출
  try {
    const nicknameDuplicateResponse = await userService.checkDuplicateNickname(nickname);
    if (nicknameDuplicateResponse.isDuplicate)
      return res.send(response(baseResponse.SIGNUP_DUPLICATED_NICKNAME));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  // 이메일 중복 확인 API 호출
  try {
    const emailDuplicateResponse = await userService.checkDuplicateEmail(email);
    if (emailDuplicateResponse.isDuplicate)
      return res.send(response(baseResponse.SIGNUP_DUPLICATED_EMAIL));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  // 빈 값이 되면 안되는 속성값 체크
  if (!id)
      return res.send(response(baseResponse.SIGNUP_ID_EMPTY));
  else if (!password)
      return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
  else if (!check_password)
      return res.send(response(baseResponse.SIGNUP_CHECK_PASSWORD_EMPTY));
  else if (!nickname)
      return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
  else if (!name)
      return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
  else if (!birth)
      return res.send(response(baseResponse.SIGNUP_BIRTH_EMPTY));
  else if (!email)
      return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
  else if (!agreed_to_terms)
      return res.send(response(baseResponse.SIGNUP_AGREED_TO_TERMS_EMPTY));
  
  // 오류 체크
  if (!validateUsername(id))
      return res.send(response(baseResponse.SIGNUP_ID_ERROR));
  else if (!validatePassword(password))
      return res.send(response(baseResponse.SIGNUP_PASSWORD_ERROR));
  else if (password != check_password) 
      return res.send(response(baseResponse.SIGNUP_CHECK_PASSWORD_ERROR));
  else if (nickname.length > 7)
      return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));
  else if (name.length > 7)
      return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));
  else if (!isValidDate(birth))
      return res.send(response(baseResponse.SIGNUP_BIRTH_ERROR));
  else if (!validateEmail(email))
      return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR));

  // const signUpResponse = await userService.createUser(
  //   id, password, nickname, name, birth, email
  // );
  
  // return res.send(signUpResponse);
  // 비밀번호 단방향 암호화 (crypto.pbkdf2)
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';
  
  try {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, async (err, derivedKey) => {
      if (err) throw err;
      
      const hashedPassword = derivedKey.toString('hex');
      // 데이터베이스에 저장되는 비밀번호는 hashedPassword로 대체합니다.
      const signUpResponse = await userService.createUser(
        id, hashedPassword, nickname, name, birth, email
      );
      return res.send(signUpResponse);
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  
}


/**
 * API No. 1
 * API Name: 로그인
 * [POST] /users/login
 * id, password
 */
exports.login = async function (req, res) {
  const { id, password } = req.body;

  // userProvider를 통해 id로 유저 정보 가져오기
  const user = await userProvider.getUserById(id);

  // 유저 정보가 없는 경우
  if (!user) {
    return res.status(404).json({ error: '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.' });
  }

  const user_state = await userProvider.getStateById(id);
  const stateValues = user_state.map((item) => item.state);
  console.log(stateValues[0]);

  // 유저의 state가 0인 경우 (로그인 차단)
  if (stateValues[0] === 0) {
    return res.status(403).json({ error: '해당 유저는 탈퇴 완료된 유저입니다.' });
  }

  // userService를 통해 로그인 로직 처리
  const signInResponse = await userService.postSignIn(id, password);


  // JWT 토큰을 응답으로 받은 후, 쿠키로 설정하여 클라이언트에게 보냅니다.
  res.cookie('token', signInResponse.jwt, {
    maxAge: 3600000, // 쿠키의 만료 시간을 밀리초 단위로 설정합니다 (1시간)
    httpOnly: true, // 클라이언트 측 JavaScript에서 쿠키에 접근하지 못하도록 합니다
    // 필요에 따라 secure와 sameSite 같은 다른 쿠키 옵션도 설정할 수 있습니다
  });

  return res.send(signInResponse);
};



/**
 * API No. 3
 * API Name : 아이디/비밀번호 찾기
 * [POST] /users/finding
 * email
 */
exports.finding = async function (req, res) {
  const {email} = req.body;

  const findingResponse = await userService.findInfo(email);

  return res.send(findingResponse);
}