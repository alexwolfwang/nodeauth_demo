/**
 * Created by Alex.W on 2017/1/4.
 */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;


var UserSchema = mongoose.Schema({
    username : {
        type:String,
        index:true
    },
    password : {
        type: String,
        required: true
    },
    email: String,
    profileimage: String,
    realName: String
});


var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser,callback) {
  newUser.save(callback);
};