const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/schemas')
const cfg = require('../configs/dbconfig')

//The users are manager here. Registering auth etc. The requests should be self eplainitory from the path

router.post('/register', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    //check if already registred email or user.
    //returns error if some field is in use
    User.func.getUserByEmail(req.body.email, (err, user) =>{
        if(err) throw err;
        if(!user){
            User.func.getUserByUsername(req.body.username, (err, user) =>{
                if(err) throw err; //simple error handling
                if(!user){
                    User.func.addUser(newUser, (err, user) =>{

                        if(err) {
                            console.log(err)
                            return res.json({success: false, msg: 'Registration failed'})

                        }else{
                            return res.json({success: true, msg: 'Registration success'})
                        }
                    });
                }else{
                    res.json({success: false, msg: 'Username in use'})
                }
            });
        }else{
            res.json({success: false, msg: 'Email in use'})
        }
    });



});

router.post('/authenticate', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    //get the user from the email
    User.func.getUserByEmail(email, (err, user) =>{
        if(err) throw err;
        //console.log(!user)
        if(!user){
            res.json({success: false, msg: 'User not found.'})
            return;
        }

        //check if the password matched with the imputted one
        User.func.compareUserPassword(password, user.password, (err, result) =>{
            if(err) throw err;
            if(!result){
                res.json({success: false, msg: 'Passwords didnt match'});
                return;
            }else{
                //generate jwt token for the user on success
                const token = jwt.sign({data: user}, cfg.secret, {expiresIn: 500000})
                res.json({
                    //Info the result
                    success: true,
                    msg: 'Login successful',
                    //return the token. Significant whitespace after JWT!
                    token: token,
                    //return the userdata to the client
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    }
                })
            }
        })
    });
});
//passport.authenticate('jwt', {session: false})

//unused from onward
router.post('/username', (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    User.func.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        //console.log(user)
        if (user) {
            res.json({success: false, msg: 'Username already taken.'})
            return;
        }
        if(email){
            User.func.getUserByEmail(email, (err, user) => {
                if (err) throw err;
                //console.log(user)
                if (user) {
                    return res.json({success: false, msg: 'Email already taken.'})

                }
            })
        }
        return res.json({success: true, msg: 'Both available'})
    })
})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //console.log(req)
    res.json({user: req.user});
});


module.exports = router
