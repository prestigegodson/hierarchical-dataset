const service = require('./service');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {

    res.send('Hello world');
});

app.post("/new", (req, res) => {

    let body = req.body;

    let response = service(body);

    res.status(200).send(response);
});

app.listen(3000, () => { console.log("connected to server");});