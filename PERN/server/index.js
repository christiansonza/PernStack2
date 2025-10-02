const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { sequelize, connectDB } = require('./config/conn');
const userRoutes = require('./routes/userRouter'); 
require('./model/userModel')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use('/users', userRoutes);

const startServer = async ()=>{
  try {
    await connectDB()
    await sequelize.sync()
    app.listen(process.env.PORT)
  } catch (error) {
    console.log('Failed to start server',error)
    
  }
}
startServer()


