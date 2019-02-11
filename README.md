# TASK

This is a restful project, running on nodejs + expressjs framework, it exposes two endpoints:
* REST API endpoint that would allow to add many organization with relations in one 
POST request
* REST API endpoint that returns relations of one organization (queried by name)

## Requirement
* docker compose

## Running Application

* Navigate to project root `cd root-directory-path`
* Run docker compose
```bash
docker-compose up -d
```
## API DOC
* GET http://localhost:3000?name=org_name&page=1&pageSize=100
* POST http://localhost:3000

## Author
Ositadinma Tochukwu Godson