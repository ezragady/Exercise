const mongoConnection = require('./database/mongo');
const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const LocalStrategy = require('passport-local').Strategy;
const {authenticateUser} = require('./users/userController')
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'encryption_password';

const passport = require('passport');
// Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, authenticateUser
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

function isAuthenticated(req,res,next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({message: 'Invalid Request'});
}

function AESEncrypt(body){
    const cipher = crypto.createCipher(algorithm,password);
    let crypted = cipher.update(body,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function AESDecrypt(text){
    const decipher = crypto.createDecipher(algorithm,password);
    let dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

app.all('/',isAuthenticated,async function (req, res) {
    const encryptedBody = AESEncrypt(req.body);
    const method = req.method;
    const newRequest = {
        method: method,
        url: req.originalUrl,
    };
    if (req.body) {newRequest.encryptedBody = encryptedBody}
    const response = await axios(newRequest);
    res.send(AESDecrypt(response.encryptedResult));
});

app.listen(3000);
