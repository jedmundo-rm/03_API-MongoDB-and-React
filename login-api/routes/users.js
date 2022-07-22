const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = require("../middleware/generateToken")
const User = require('../models/user')

router.post('/signup', (req, res, next) => {

    // console.log(req.body)
    // res.send('recibido')

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(409).json({
                message: 'Mail Exists'
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                return res.status(500).json({
                        error: err
                    })
                } else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        pic: req.body.pic, // si ponemos esto entonces en el formulario es obligatorio poner una imagen
                        password: hash
                    })
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            // Este es el mensaje que sale en consola y en insomnia
                            message: 'User created',
                            data: user
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })

})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if(user.length < 1) {
            return res.status(404).json({
                message: 'Auth failed'
            })
        }

        bcrypt.compare(req.body.password, user[0].password, (err,result)=> {
            if (err){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if (result){
                const token = jwt.sign(
                    { 
                        userId: user[0]._id,
                        name: user[0].name,
                        email: user[0].email,
                        isAdmin: user[0].isAdmin,
                        pic: user[0].pic, 
                        token: generateToken(user._id)
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})



router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'user deleted'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            users: docs.map( doc => {
                return{
                    _id: doc._id,
                    email: doc.email,
                    password: doc.password,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3001/users/'
                    }
                }
            }),

        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    })
})


module.exports = router