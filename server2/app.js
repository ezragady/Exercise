const mongoConnection = require('./database/mongo');
const express = require('express');
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const algorithm = 'aes-256-ctr';
const password = 'encryption_password';
const settingsController = require('./settings/settingsController');

function AESEncrypt(body){
    const cipher = crypto.createCipher(algorithm,password);
    let crypted = cipher.update(body,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function AESDecrypt(text){
    const decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

app.all('/',async function (req, res, next) {
    const decryptedBody = AESDecrypt(req.body);
    req.body = decryptedBody;
    next();
});

app.use('/settings',settingsController);

app.use((req, res, next) => {
    let oldSend = res.send;
    res.send = function(data) {
        data = AESEncrypt(data);
        res.send = oldSend;
        return res.send({encryptedResult: data});
    };
    next()
});
app.listen(3000);
