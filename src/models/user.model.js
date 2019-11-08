const mongoose = require('mongoose');
const UserSchema = require('./schemas/user.schema');
const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
