async function selectRefrigerator(connection) {
    const selectRefrigeratorQuery = `
      SELECT ingre_id, ingre_type
      FROM refrigerator where userid = 2;
    `;
    const [rows] = await connection.query(selectRefrigeratorQuery);
    return rows;
  };

module.exports = {
    selectRefrigerator
};