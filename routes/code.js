const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {Comment, CodeSnippet, func} = require('../models/code')

//TODO unify all the posts back to find without params -> move that to the service in frontend
router.post('/newcode', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const user = req.user
    const code = req.body.text;
    if(code == null || code == "null" || code.length <= 0){
        return res.sendStatus(201)
    }
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
    if(commentText == null){
        return res.sendStatus(201)
    }
    const code = req.body.codeId;
    const comment = new Comment({
        text: commentText,
        author: user.username
    });
    func.addComment(comment, code);
});


router.get('/all', (req, res, next) => {

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
