const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponse");
const { response, errResponse } = require("../../../config/response");
const fs = require("fs");

/**
 * API No. 1
 * API Name : 휴대폰 인증 번호 발송
 * [POST] /users/send
 */
exports.send = async function (req, res) {

};

/**
 * API No. 2
 * API Name : 테스트 API
 * [POST] /users/verify
 */
exports.verify = async function (req, res) {

  };