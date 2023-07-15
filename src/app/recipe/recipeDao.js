//API.15 레시피 리뷰 등록하기 
async function insertReview(connection, Info) {
    
    const registerReviewQuery = `
    insert into review(recipe_id,userid,star,content,createdAt) values(${Info[0]}, ${Info[1]}, ${Info[2]}, '${Info[3]}',now());
    `;
    const userRows = await connection.query(registerReviewQuery);
    return userRows[0];
}


module.exports = {
    insertReview,
    
}; 