const jwt = require('passport-jwt')
const User = require('../models/schemas')
const config = require('../configs/dbconfig')
//Passport confiq = passport jwt strategy for jwt auth.

module.exports = function (passport){
    let opts = {}
    opts.jwtFromRequest = jwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.secret
    passport.use(new jwt.Strategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        User.func.getUserById(jwt_payload.data._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }


        })
    }));

}