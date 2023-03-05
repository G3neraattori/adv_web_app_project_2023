const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../configs/dbconfig')
const e = require("express");

//Although the name is "schamas" contains only the user schema and functions. Couple unused, all should be pretty easy to
//figure from the function name
const UserSchema = mongoose.Schema({
   username:{
       type: String,
       required: true,
   },

    password:{
       type: String,
       required: true,
    },

    email: {type: String, required: true}
});


const User = module.exports = mongoose.model('User', UserSchema)

module.exports.func = {
    //getters. findOne works for custom fields. Id for id.
    getUserById: function (id, res){
        User.findById(id, res);
    },

    getUserByUsername: function (username, res) {
        const query = {username: username}
        User.findOne(query, res)
    },

    getUserByEmail: function (email, res) {
        const query = {email: email}
        User.findOne(query, res)
    },

    //add user
    addUser: function (newUser, cb) {
        //Bcrypt for hashing for additional security
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err)
                    throw err
                }
                newUser.password = hash;
                //why do we pass callback here?
                newUser.save(cb);
            });
        });
    },

    //check is password is correct
    compareUserPassword: function (typedPassword, passwordHash , cb){
        //Bcrypt for hashing for additional security
        bcrypt.compare(typedPassword, passwordHash, (err, res) =>{
           if(err) throw err;
           cb(null, res);
       });
    },

    //not currently used. Could also be used to check if user exists.
    isTaken(username, email, cb){
        User.find(
            {username: username},
            function(err, name) {
                if (name.length){
                    cb('Name exists already',null);
                }else{

                }
                console.log(err)
            });
    }
};

