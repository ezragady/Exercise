const UsersModel = require('./userModel').UsersModel;

function authenticateUser(username, password, done) {
    UsersModel.findOne({username}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password === password) { return done(null, false); }
        return done(null, user.toObject());
    });
}

module.exports = {authenticateUser};

