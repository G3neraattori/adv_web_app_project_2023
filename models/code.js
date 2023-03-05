const mongoose = require('mongoose')
const e = require("express");
const bcrypt = require("bcryptjs");

//schemas for the comments. First because codesnippets need the scema to exist first
const CommentSchema = mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});
//code snippet schema
const CodeSnippetSchema = mongoose.Schema({
    code: { type: String, required: true },
    author: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    comments: [CommentSchema]
});



const CodeSnippet = mongoose.model('CodeSnippet', CodeSnippetSchema);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment, CodeSnippet};

//functions are wrapped to single export. Names should explain what they do. Just basic mongoose commands
module.exports.func = {
    addCode: function (newCode, cb) {
        newCode.save(cb);

    },
    addComment: function (comment, code, cb) {
        console.log(comment, code)
        //let save = { pname: givenPname, psize: givenPsize }
        comment.save(cb);
        CodeSnippet.updateOne(
            {_id: code},
            {$addToSet: {comments: comment}}, //add to set since it's an array
            cb,function(err) { console.log(err) });
    },
    //this was for edits but I didn'ts have time to implement that
    findCode: function (id, cb){

    }

}


/*module.exports.normalSearch = function (res) {

    const test1 = History.find({productName: "Jameson"})
    test1.select('productName bottleSize pricePerLiter');

    test1.exec(function (err, data) {
        if (err) throw (err);
        return data;
    });


}
*/
