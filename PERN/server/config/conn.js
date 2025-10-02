const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'postgres'
  }
)

const connectDB = async()=>{
  try {
    await sequelize.authenticate()
    console.log('Database connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = {sequelize,connectDB}