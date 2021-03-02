/**
 * @file index.js is the root file for this todo application
 * @author Innocent Ingabire
 */

import express from 'express';
import 'regenerator-runtime/runtime';
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import swaggerDocument from '../swagger.json';
import router from '../src/routes/index'
// import connectDB from './config/db';

const app = express();
// connectDB()
const PORT = 3000 || process.env.PORT;

app.use('/api',router);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(PORT, ()=>{
  console.log('Server has started at port ', PORT)
});

module.exports = app;