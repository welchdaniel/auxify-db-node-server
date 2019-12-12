const DEFAULTS = require('../util/defaults.js')
const PartyDao = require('../dao/party.dao.js');
const UserDao = require('../dao/user.dao.js');

getAllParties = () => {
	return PartyDao.findAllParties();
}

getPartyById = (id) => {
	return PartyDao.findPartyById(id);
}

userCreateParty = async(userId, party) => {
	const storableParty = {
		...DEFAULTS.defaultParty,
		name: party.name,
		partyType: party.partyType,
		passwordReq: party.passwordReq,
		password: party.password,
	}
	const user = await UserDao.findUserById(userId);
	const userPartyId = user['currentPartyId'];
	if (!!userPartyId) {
		await PartyDao.removeUserFromParty(userPartyId, userId);
	}
	const newParty = await PartyDao.createParty(storableParty);
	const newPartyId = newParty['_id'];
	await PartyDao.setPartyLeader(newPartyId, userId);
	return PartyDao.findPartyById(newPartyId);
}

createParty = (party) => {
	return PartyDao.createParty(party);
}

updateParty = (id, party) => {
	return PartyDao.updateParty(id, party);
}

deleteParty = (id) => {
	return PartyDao.deleteParty(id);
}

addUserToParty = async(partyId, userId) => {
	try {
		await PartyDao.addUserToParty(partyId, userId);
		return {status: '200', message: 'User added to party'};
	} catch(error) {
		return {status: '406', message: error};
	}
}

removeUserFromParty = async(partyId, userId) => {
	try {
		await PartyDao.removeUserFromParty(partyId, userId);
		return {status: '200', message: 'User removed from party'};
	} catch(error) {
		return {status: '406', message: error};
	}
}

setPartyLeader = async(partyId, userId) => {
	try {
		await PartyDao.setPartyLeader(partyId, userId);
		return {status: '200', message: 'User promoted to party leader'};
	} catch(error) {
		return {status: '406', message: error};
	}
}

banUserFromParty = (partyId, userId) => {
	return PartyDao.banUserFromParty(partyId, userId);
}

addSongToPlayed = (partyId, song) => {
	return PartyDao.addSongToPlayed(partyId, song);
}

module.exports = {
	getAllParties,
	getPartyById,
	userCreateParty,
	createParty,
	updateParty,
	deleteParty,
	addUserToParty,
	removeUserFromParty,
	setPartyLeader,
	banUserFromParty,
	addSongToPlayed,
}