# todoApp
[![Coverage Status](https://coveralls.io/repos/github/Nosenti/todoApp/badge.svg?branch=ft-swagger-and-testing)](https://coveralls.io/github/Nosenti/todoApp?branch=ft-swagger-and-testing)

# Description

TodoApp helps people schecule their activities and keep track of their progress. 

## Setup

### Dependencies

npm, nodejs, git

### Getting Started

List of steps to get started (e.g. clone repo, submodule, .env file, etc)
clone the repository: https://github.com/Nosenti/todoApp.git
Inside the folder, create .env file and check example.env file for environment variables you will need to create
install dependencies by running the command npm install to install required dependencies.

### Utilizing dotenv

Create .env file in your repository
For environmental variables; type the name of variable and assign to a certain value inside the .env file. 
To access the variables in .env file; use process.env.VARIABLE_NAME.
Checking example.env file, you will see the variable examples. You will need to change the variable values to make it your own (in .env file which will be ignored by .gitignore).

### Run The Service

To run the app, run the command npm run start inside the folder using the terminal

### Test

To test the application, run the command npm run test inside the folder using the terminal

### Swagger documentation and end points

To check the endpoints created, you can easily use swagger.
After running the application, go in your browser and access /api-docs, you will see the documentation of the API

