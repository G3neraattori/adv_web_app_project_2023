const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {Comment, CodeSnippet, func} = require('../models/code')

//handling for the code snippets etc. Since the codes include the comments too /all gives all the required info. Session req.user keeps the userdata preventing spoofing the username


router.post('/newcode', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const user = req.user
    const code = req.body.text;
    //code can't be empty
    if(code == null || code == "" || code.length <= 0){
        return res.sendStatus(201)
    }
    //create comment and send to backend to be saved
    let newCode = new CodeSnippet({
        code: code,
        author: user.username
    });
    console.log(newCode);
    func.addCode(newCode);
});

router.post('/comment', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const user = req.user
    const commentText = req.body.comment;
    //comment cant be empty
    if(commentText == null || commentText == "" || commentText.length <= 0){
        return res.sendStatus(201)
    }
    const code = req.body.codeId;
    //create comment and send to backend to be saved
    const comment = new Comment({
        text: commentText,
        author: user.username
    });
    func.addComment(comment, code);
});


router.get('/all', (req, res, next) => {
    //basically mongodb query, faster
    CodeSnippet.find()
        .exec(function (err, data){
            if (err) throw err;
            //console.log(data)
            res.json({
                success: true,
                msg: 'Data found',
                data: data
            });
        });
});





module.exports = router
