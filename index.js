const { insert, findByName, findRelations } = require('./service');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('', async (req, res) => {

    const name = req.query.name;
    const page = req.query.page ? req.query.page : 1;
    const pageSize = req.query.pageSize ? req.query.pageSize : 100;

    try{
        let response = await findByName(name);
        if(response.length > 0){
            let relations = await findRelations(response[0], page, pageSize);
            res.send(relations);
        }else{
            res.status(404).send(`could not find organization with name (${name})`);
        }
    }catch(err){
        res.status(500).send(err.message);
    }
});

app.post("", async (req, res) => {

    let body = req.body;

    try{
        const response = await insert(body);
        res.status(200).send(response);
    }catch(err){
        res.status(400).send(err.message);
    }

});

app.listen(3000, () => { console.log("connected to server");});