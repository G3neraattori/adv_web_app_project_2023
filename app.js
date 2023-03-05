const express = require('express');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongo_config = require('./configs/dbconfig')
const passport = require('passport')
const session = require('express-session')
const users = require('./routes/users')
const code = require('./routes/code')

const app = express();
const port = 5000;

//MongoDB block
mongoose.connect(mongo_config.database);
mongoose.connection.on('connected', () =>{
   console.log(mongo_config.database)
});


//session based auth, not really used
app.use(session({
    secret: "TEMPORARY",
    resave: false,
    saveUninitialized: true
}));
//init middleware
app.use(cors());
//init passport
app.use(passport.initialize());
app.use(passport.session())
require('./configs/passportconfig')(passport)

//Set the static folder so the deployment can be run
app.use(express.static(path.join(__dirname, '/adv_web_app_project/build')))
app.use(bodyParser.json())
//Routing
app.use('/users', users)
app.use('/code', code)


app.get('/', (req, res) =>{
    res.send("Invalid endpoint")
});

//this runs the deployment from the static folder.
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/adv_web_app_project/build/index.html'))
})

app.listen (port, () =>{
    console.log('Server started on ' + port)
});