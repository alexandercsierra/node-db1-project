const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get("/", (req, res)=>{
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'could not get accounts'})
        })
    
})

server.get("/:id", (req, res)=>{
    db('accounts').where({id:req.params.id})
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'could not get account'})
        })
    
})

server.post('/', (req, res)=>{
    db('accounts').insert(req.body, 'id')
        .then(account=>{
            res.status(201).json(account)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'could not add account'})
        })
})

server.put('/:id', (req,res)=>{
    db('accounts').where({id: req.params.id}).update(req.body)
        .then(account=>{
            res.status(200).json(account)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'could not update account'})
        })
    
})

server.delete('/:id', (req, res)=>{
    db('accounts').where({id: req.params.id}).del()
        .then(account=>{
            res.status(200).json(account)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'could not delete account'})
        })
})


module.exports = server;