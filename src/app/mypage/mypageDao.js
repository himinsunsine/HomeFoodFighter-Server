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

async function selectMyReviews(connection, userid) {
    const selectMyReviewsQuery = `
    SELECT
        r.review_id,
        r.recipe_id,
        DATE_FORMAT(r.createdAt, '%Y-%m-%d') AS bydate,
        u.nickname,
        r.content,
        r.star
    FROM
        review r
    JOIN
        User u ON r.userid = u.userid
    WHERE
        u.userid = ${userid};
                    `;
    const [my_reviewsRows] = await connection.query(selectMyReviewsQuery);
    return my_reviewsRows;
}

async function deleteMyReview(connection, userid, review_id){
    const deleteMyReviewQUery = `
    delete from review where userid= ${userid} and review_id =${review_id}; 
    `;

    const deleteReviewRows = await connection.query(deleteMyReviewQUery);
    return deleteReviewRows[0];
}

async function selectMyFavorites(connection, userid) {
    const selectMyFavoritesQuery = `
    SELECT
        R.recipe_id,
        U.nickname,
        R.summary,
        R.img_url,
        R.recipe_name,
        AVG(rev.star) AS star,
        COUNT(rev.review_id) AS review_count
    FROM
        User U
    JOIN
        Recipe R ON U.userid = R.userid
    LEFT JOIN
        review rev ON R.recipe_id = rev.recipe_id
    WHERE
        R.recipe_id IN (
            SELECT F.recipe_id
            FROM FavoriteRecipes F
            WHERE F.userid = ${userid}
        )
    GROUP BY
        U.nickname,
        R.summary,
        R.img_url,
        R.recipe_id,
        R.recipe_name;
    `;
    const [my_favoritesRows] = await connection.query(selectMyFavoritesQuery);
    return my_favoritesRows;
}

async function selectMyRecipes(connection, userid) {
    const selectMyRecipesQuery = `
                    SELECT r.recipe_id, r.userid, r.recipe_name, r.summary, COUNT(rv.recipe_id) AS review_count, AVG(rv.star) AS average_review_star
                    FROM Recipe r
                    LEFT JOIN review rv ON r.recipe_id = rv.recipe_id
                    WHERE r.userid = ${userid}
                    GROUP BY r.recipe_id, r.userid, r.recipe_name, r.summary;
                    `;
    const [my_recipesRows] = await connection.query(selectMyRecipesQuery);
    return my_recipesRows;
}


// 회원 탈퇴
async function changeState(connection, userid) {
    const updatestateQuery = `
    UPDATE User
    SET state = 0
    WHERE userid=${userid};`;

    const updateStateRow = await connection.query(updatestateQuery);
    return updateStateRow;
}

//API.30 회원정보조회
async function selectUserinfo(connection, userid) {
    const selectUserinfoQuery = `
                    SELECT nickname, name, userid, image
                    FROM User
                    WHERE userid=${userid};
                    `;
    const [userinfoRows] = await connection.query(selectUserinfoQuery);
    return userinfoRows
}

module.exports = {
    updatePasswordInfo,
    selectUserPassword,
    selectMyReviews,
    selectMyRecipes,
    changeState,
    selectMyFavorites,
    deleteMyReview,
    selectUserinfo,
};  