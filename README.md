# Twitter Clone

## PROJECT INSTALLATION

1. Clone project from github repository
2. Run command prompt and navigate to project directory
3. Run 'npm install' to install all required modules

NOTE: If there is trouble installing any gulp package try with --no-bin-links:
'npm install gulp --save-dev --no-bin-links'

## DB CONFIGURATION

1. Create twitterclonedb database in postgreSQL
2. Enter correct postgreSQL username and password in /src/models/models.js
3. Run command prompt and navigate to project directory
4. Run 'node database.js' or (npm builddb) to create all required tables and insert the default user

NOTE: You must have PostgreSQL installed on your machine.

## RUN WITH GULP

1. Run command prompt and navigate to project directory
2. Run 'gulp' to build project and start node.js server
3. Type localhost:3000 in your browser

## BUILD FOR PRODUCTION

1. Run command prompt and navigate to project directory
2. Run 'gulp build' to build project into dist folder
