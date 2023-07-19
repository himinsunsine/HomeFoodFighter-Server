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
                    FROM user
                    WHERE id = ?;
                    `;
    const [idRows] = await connection.query(selectUserIdQuery, id);
    return idRows;
}

module.exports = {
    insertUser,
    selectUserId
};  