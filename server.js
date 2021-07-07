const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();


server.get('/', (req, res) => {
    db('accounts')
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ message: 'problem with the database' });
    })
})

server.get('/:id', (req, res) => {
    const { id } = req.params
    db.select('*').from('accounts').where({ id })
        .then(accounts => {
            res.status(201).json(accounts)
        })
        .catch(err => {
            res.status(500).json({message: "error wit u"})
        })
})


server.post('/', async (req, res) => {
    const accountData = req.body;

    try {
        const post = await db.insert(accountData).into('posts')
        res.status(201).json(post)
    } catch (err) {
        res.status(500).json({message: "db problem"})
    }
})



server.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body;
    db('accounts').where({id}).update(changes)
        .then(count => {
            if (count) {
                res.status(200).json({message: "count"})
            } else {
                res.status(404).json({message: "invalid id"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "db problem"})
        })
})







server.use(express.json());

module.exports = server;