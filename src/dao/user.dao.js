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

addSongToRecent = async(userId, addedSongId) => {
	let repeatedTrack = false;
	let maxListOrder = 0;
	const user = await UserModel.findById(userId);
	const userRecentTracks = user.recentTracks;
	for (const track of userRecentTracks) {
		if (track.songId.toString() === addedSongId) {
			repeatedTrack = true;
		}
		if (track.listOrder > maxListOrder) {
			maxListOrder = track.listOrder;
		}
	}
	const storableSong = {
		listOrder: maxListOrder + 1,
		songId: addedSongId,
	}
	if(repeatedTrack) {
		await UserModel.updateOne(
			{_id: userId},
			{$pull: {recentTracks: {songId: addedSongId}}},
			{upsert: false}
		);
	}
	else {

	}
	return UserModel.updateOne(
		{_id: userId},
		{$addToSet: {recentTracks: storableSong}},
		{upsert: false}
	);
}

login = async(un, pw) => {
	const user = await UserModel.findOne({username: un});
	if (!user) {
		throw("Invalid username");
	}
	if (pw === user.password) {
		return user;
	}
	throw("Incorrect password"); 
}

module.exports = {
	findAllUsers,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
	addSongToRecent,
	login,
}
