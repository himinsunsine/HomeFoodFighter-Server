exports.selectRefrigerator = async function (connection) {
    const selectRefrigeratorQuery = `
      SELECT *
      FROM Refrigerator;
    `;
    const [rows] = await connection.query(selectRefrigeratorQuery);
    return rows;
  };
  
  exports.insertRefrigeratorItem = async function (connection, itemInfo) {
    const insertRefrigeratorItemQuery = `
      INSERT INTO Refrigerator (itemName, quantity)
      VALUES (?, ?);
    `;
    const insertRefrigeratorItemParams = [itemInfo.itemName, itemInfo.quantity];
    await connection.query(insertRefrigeratorItemQuery, insertRefrigeratorItemParams);
  };
  
  exports.deleteRefrigeratorItem = async function (connection, itemInfo) {
    const deleteRefrigeratorItemQuery = `
      DELETE FROM Refrigerator
      WHERE itemName = ?;
    `;
    const deleteRefrigeratorItemParams = [itemInfo.itemName];
    await connection.query(deleteRefrigeratorItemQuery, deleteRefrigeratorItemParams);
  };
  

module.exports = {
    
};