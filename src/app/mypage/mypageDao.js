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
                    SELECT r.review_id, r.recipe_id, u.nickname, r.content, r.star, r.createdAt
                    FROM review r
                    JOIN User u ON r.userid = u.userid where u.userid=${userid};
                    `;
    const [my_reviewsRows] = await connection.query(selectMyReviewsQuery);
    return my_reviewsRows;
}

async function selectMyRecipes(connection, userid) {
    const selectMyRecipesQuery = `
                    SELECT r.recipe_id, r.userid, r.recipe_name, r.summary, AVG(rv.star) AS average_review_star
                    FROM Recipe r
                    LEFT JOIN review rv ON r.recipe_id = rv.recipe_id
                    WHERE r.userid = ${userid}
                    GROUP BY r.recipe_id, r.userid, r.recipe_name, r.summary;
                    `;
    const [my_recipesRows] = await connection.query(selectMyRecipesQuery);
    return my_recipesRows;
}


module.exports = {
    updatePasswordInfo,
    selectUserPassword,
    selectMyReviews,
    selectMyRecipes,
};  