const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/conn')

const userModel = sequelize.define('User',{
  id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
  first_name:{type:DataTypes.STRING(100), allowNull:false},
  middle_name:{type:DataTypes.STRING(100), allowNull:true},
  last_name:{type:DataTypes.STRING(100), allowNull:false},
  contact:{type:DataTypes.STRING(20), allowNull:false},
  address:{type:DataTypes.TEXT, allowNull:false},
  },
  {
    tableName:'users',
    timestamps:false
  })

module.exports = userModel;
