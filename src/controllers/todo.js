import express from 'express'
import Todo from '../models/Todo.js'
import User from '../models/User.js'

/**
 * class to create a todo object
 */
class Todo_ {

  /**
   * @property {Function} getTodos Getting all todos
   * @returns {todos}
   */
  async getTodos(req, res) {
    try {
      
      const todos = await Todo.find({user: req.user.id})

      if(! todos){
        res.status(404).send({
          status: 404,
          message: ' No todos found'
        })
      }
      
      return res.status(200).send({
        todos
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
  /**
   * @property {Function} getOneTodo Getting one todo item
   * @returns {todo}
   */

  async getOneTodo(req,res){
    try {
      const todo = await Todo.findById(req.params.id)
      if(todo){
        if(todo.user.toString() === req.user.id){
          return res.status(200).send(todo);
        }else{
          return res.status(403).send({
            status: 403,
            message: 'unauthorized access'
          })
        }
        
      }else{
        return res.status(404).send({
          message: 'Todo not found'
        })
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: 'server error'
      })
    }
  }

  /**
   * @property {Function} createTodo creating one todo item
   * @returns {todo}
   */

  async createTodo(req, res) {
    try {
      const {title, description, priority} = req.body;
      const todo = await Todo.create({
        title,
        description,
        priority,
        user: req.user.id
      })

      return res.status(201).send({
        todo,
        message:'Todo created'
      })   
        
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  /**
   * @property {Function} updateTodo updating one todo item
   * @returns {todo}
   */
  async updateTodo(req,res){
    try {
      const todo = await Todo.findById(req.params.id);
      if(!todo){
        return res.status(404).send({
          status: 404,
          message: 'The resource you want to update does not exist'
        })
      }

      if(req.user.id === todo.user.toString()){
        Object.assign(todo, req.body);
        todo.save();
        res.status(200).send({
          status: 200,
          message: 'Todo updated'
        })
      }else{
        res.status(403).send({
          error: 'User not authorized'
        })
      }
      
      
    } catch (error) {
      res.status(500).send({
        status: 500,
        message:'server error'
      })
    }
  }

  /**
   * @property {Function} deleteTodo Getting one todo item
   * @returns {message}
   */
  async deleteTodo(req,res){
    try {
      const todo = await Todo.findById(req.params.id);
      if(!todo){
        return res.status(404).send({
          status: 404,
          message: 'The ressource you want to delete does not exist'
        })
      } 
      
      if(req.user.id === todo.user.toString()){
        await todo.remove();
         return res.status(200).send({
          status: 200,
          message: 'Todo is deleted'
        })
      }else{
        res.status(403).send({
          status: 403,
          message: 'Not authorized'
        })
      }
      
     
    } catch (error) {
      res.status(500).send(error)
    }
  }

 }

export default new Todo_();