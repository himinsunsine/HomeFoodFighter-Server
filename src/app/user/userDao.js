// 유저 삽입
async function insertUser(connection, insertUserParams) {
    const insertUserQuery =`
              INSERT INTO User (id, password, nickname, name, birth, email, state)
              VALUES (?, ?, ?, ?, ?, ?, 1);
                `;
                
    const insertUserRow = await connection.query(
        insertUserQuery,
        insertUserParams
    );

    return insertUserRow;
}

async function selectUserId(connection, id) {
    const selectUserIdQuery = `
                    SELECT id, nickname
                    FROM User
                    WHERE id = ?;
                    `;
    const [idRows] = await connection.query(selectUserIdQuery, id);
    return idRows;
}

// id와 password로 유저 조회
async function selectUserPassword(connection, selectUserPasswordParams){
    console.log(selectUserPasswordParams)
    const selectPasswordQuery = `
        SELECT userId, id, nickname, password
        FROM User
        WHERE id = ? AND password = ?;
    `;
    
    const selectUserPasswordRow = await connection.query(
        selectPasswordQuery,
        selectUserPasswordParams
    );
    return selectUserPasswordRow;
}

async function selectUserAccount(connection, id) {
    const selectUserAccountQuery = `
        SELECT userId, id, state 
        FROM User
        WHERE id = ?    
    `
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        id
    );
    return selectUserAccountRow[0];
}

module.exports = {
    insertUser,
    selectUserId,
    selectUserPassword,
    selectUserAccount,
};  