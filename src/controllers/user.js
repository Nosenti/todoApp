
import express from 'express'
import User from '../models/User.js'
import {comparePassword, hashPassword,jwtToken } from '../utils/jwtToken.js';

export default class Users {

  static async signUp(req, res) {
    try {
      const { name, email, password, confirmPassword} = req.body;
      const user_ = await User.findOne({ email  });
      if (user_) return res.status(400).send({ status: 400, error: `User already exists` });

      if(password !== confirmPassword){
        return res.status(400).send({
          status: 400,
          message: 'password and confirm password do not match'
        })
      }

      const newUser = await User.create({
        name,
        email,
        password: hashPassword(password),
        confirmPassword
      })
      const token = jwtToken.createToken(newUser);
      return res.status(200).send({ token }); 
    } catch (error) {
      return res.status(500).send({
        message: 'Server error',
        error: error
      });
    }
  }
        
  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user_ = await User.findOne({ email  });
      if (!user_) return res.status(400).send({ status: 400, error: `User ${email} doesn't exist` });
      if (user_ && comparePassword(password, user_.password)) {
        const token = jwtToken.createToken(user_);
        return res.status(200).send({ token }); 
      }
      return res.status(400).send({ status: 400, error: 'invalid email/password combination ' });
    } catch (error) {
      return res.status(500).send({
        message: 'Server error',
        error: error
      });
    }
  }
  
  
}