module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    position: DataTypes.ARRAY(DataTypes.TEXT),
    moves: DataTypes.JSON,
    whiteToMove: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    inCheck: DataTypes.INTEGER,
    whiteUsername: DataTypes.STRING,
    blackUsername: DataTypes.STRING,
    drawOfferedBy: DataTypes.INTEGER,
    positionHistory: { type: DataTypes.JSON, allowNull: false, defaultValue: [] },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    winner: DataTypes.INTEGER,
    result: DataTypes.STRING,
  });
}

