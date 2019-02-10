# TASK

This is a restful project, running on nodejs + expressjs framework, it exposes two endpoints:
* REST API endpoint that would allow to add many organization with relations in one 
POST request
* REST API endpoint that returns relations of one organization (queried by name)

## Requirement
* PostgreSQL database server
* Install [nodejs](https://nodejs.org/en/)

## Setting up database
```sql
CREATE DATABASE pipdrive
CREATE ROLE pipdrive LOGIN
ALTER ROLE pipdrive WITH PASSWORD pipdrive
GRANT ALL PRIVILEGES ON DATABASE pipdrive to pipdrive;
```

## Running Application

* Navigate to project root `cd root-directory-path`
* Run the index.js via terminal
```bash
node .
```
## Author
Ositadinma Tochukwu Godson