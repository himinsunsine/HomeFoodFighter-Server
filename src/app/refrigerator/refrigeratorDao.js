//API.22 냉장고 조회하기
async function selectRefrigerator(connection) {
    const selectRefrigeratorQuery = `
      SELECT ingre_id, ingre_type
      FROM refrigerator where userid = 2;
    `;
    const [rows] = await connection.query(selectRefrigeratorQuery);
    return rows;
  }

//API.23 냉장고 채우기
async function insertRefrigerator(connection, arr) {
  const insertRefrigeratorQuery = `
    INSERT INTO refrigerator(userid, ingre_id, ingre_type) VALUES (${arr[0]}, ${arr[1]}, ${arr[2]});
  `;
  const rows = await connection.query(insertRefrigeratorQuery);
  return rows[0];
}

module.exports = {
    selectRefrigerator,
    insertRefrigerator
};