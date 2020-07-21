
const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');

var sequelize = new Sequelize('sqlite', 'username', 'password', {
    dialect: 'sqlite',
    logging: false,
    storage: path.join(__dirname, "./temp.db")
});

class user extends Model { }
user.init({
    email: DataTypes.STRING(),
}, { sequelize, modelName: 'user', tableName: 'user' });


class testCase extends Model { }
testCase.init({
    code: DataTypes.TEXT,
    env: DataTypes.JSON,
    script: DataTypes.TINYINT,
    type: DataTypes.TINYINT,
}, { sequelize, modelName: 'testCase', tableName: 'testCase' });


testCase.belongsTo(testCase, {
    foreignKey: { name: 'parentId', allowNull: true }
});
testCase.hasMany(testCase, {
    foreignKey: { name: 'parentId', allowNull: true }
});


testCase.belongsTo(user, {
    foreignKey: { name: 'userId', allowNull: true }
});
user.hasMany(testCase, {
    foreignKey: { name: 'userId', allowNull: true }
});



module.exports = {
    sequelize,
    tables: {
        user,
        testCase,
    }
}

