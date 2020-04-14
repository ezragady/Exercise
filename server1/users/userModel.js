const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: String,
    password: String,
});

const UsersModel = mongoose.model('users', UsersSchema);
module.exports.UsersModel = UsersModel;
