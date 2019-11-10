const UserModel = require('../models/user.model');

const PartyDao = require('./party.dao');

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

deleteUser = async(id) => {
	const user = await UserModel.findById(id);
	const currentPartyId = user.currentPartyId;
	if (currentPartyId) {
		PartyDao.removeUserFromParty(currentPartyId, id);
	}
	return UserModel.findByIdAndDelete(id);
}

module.exports = {
	findAllUsers,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
}
