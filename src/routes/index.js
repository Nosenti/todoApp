import express from 'express';

import userController from '../controllers/user.js';
import todoController from '../controllers/todo.js';
import checkAuth from '../middleware/checkAuth.js';

import { userSignInValidate } from '../validators/userSigninValidator.js';
import { userSignUpValidate } from '../validators/userSignupValidate.js';
import { todoValidate, todoValidator } from '../validators/todoValidator.js';


const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../swagger.json");



const router = express.Router();
router.use(express.json());
router.get('',()=>{
  console.log('Welcome to TodoApp')
})

router.post('/signup', userSignUpValidate, userController.signUp);
router.post('/signin', userSignInValidate, userController.signIn);

router.post('/todos', checkAuth.verifyUser, todoValidator, todoController.createTodo);
router.get('/todos', checkAuth.verifyUser, todoController.getTodos);
router.get('/todos/:id', checkAuth.verifyUser, todoController.getOneTodo);
router.put('/todos/:id', checkAuth.verifyUser, todoController.updateTodo);
router.delete('/todos/:id', checkAuth.verifyUser, todoController.deleteTodo);

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default router;