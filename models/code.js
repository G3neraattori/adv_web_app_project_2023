const mongoose = require('mongoose')
const e = require("express");
const bcrypt = require("bcryptjs");
const CommentSchema = mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now }
});
const CodeSnippetSchema = mongoose.Schema({
    code: { type: String, required: true },
    author: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    comments: [CommentSchema]
});



const CodeSnippet = mongoose.model('CodeSnippet', CodeSnippetSchema);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment, CodeSnippet};

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
            {$addToSet: {comments: comment}},
            cb,function(err) { console.log(err) });
    },
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
