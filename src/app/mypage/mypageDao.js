// 비밀번호 변경
async function updatePasswordInfo(connection, updatePasswordInfoParams) {
    const updatePasswordQuery = `
    UPDATE User 
    SET password = ?, updatedAt = now()
    WHERE (userid = ?);`;

    const updatePasswordRow = await connection.query(updatePasswordQuery, updatePasswordInfoParams);
    return updatePasswordRow;
}

async function selectUserPassword(connection, password_present, userid) {
    const selectUserPasswordQuery = `
                    SELECT password
                    FROM User
                    WHERE password="${password_present}" AND userid=${userid};
                    `;
    const [passwordRows] = await connection.query(selectUserPasswordQuery);
    return passwordRows;
}


module.exports = {
    updatePasswordInfo,
    selectUserPassword,
};  