const UserModel = require('../models/user.model');

findAllUsers = () => {
	return UserModel.find();
}

findUserById = (id) => {
	return UserModel.findById(id);
}

createUser = (user) => {
	return UserModel.create(user);
}

updateUser = (id, user) => {
	return UserModel.updateOne({_id: id}, {$set: user});
}

deleteUser = (id) => {
	return UserModel.findByIdAndDelete(id);
}

module.exports = {
	findAllUsers,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
}
