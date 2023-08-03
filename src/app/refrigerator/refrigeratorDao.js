//API.22 냉장고 조회하기
async function selectRefrigerator(connection, user_id) {
    const selectRefrigeratorQuery = `
      SELECT r.ingre_id, i.ingre_type, i.ingre_name
      FROM refrigerator r
      JOIN ingredient i ON r.ingre_id = i.ingre_id
      WHERE r.userid = '${user_id}';
    `;
    const [rows] = await connection.query(selectRefrigeratorQuery);
    return rows;
  }

//API.23 냉장고 채우기
async function insertRefrigerator(connection, arr) {
  const insertRefrigeratorQuery = `
    INSERT INTO refrigerator (userid, ingre_id)
    SELECT ${arr[0]}, ingre_id
    FROM ingredient
    WHERE ingre_id IN (${arr[1]});
  `;
  const rows = await connection.query(insertRefrigeratorQuery);
  return rows;
}

//API.24 냉장고 비우기
async function removeRefrigerator(connection, arr) {
  const deleteRefrigeratorQuery = `
    DELETE FROM refrigerator
    WHERE userid = ${arr[0]}
    AND ingre_id IN (${arr[1]});
  `;
  const rows = await connection.query(deleteRefrigeratorQuery);
  return rows[0];
}

module.exports = {
    selectRefrigerator,
    insertRefrigerator,
    removeRefrigerator
};