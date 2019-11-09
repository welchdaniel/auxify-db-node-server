const PartyDao = require('../dao/party.dao.js');

getAllParties = () => {
	return PartyDao.findAllParties();
}

getPartyById = (id) => {
	return PartyDao.findPartyById(id);
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

removeUserFromParty = (partyId, userId) => {
	return PartyDao.removeUserFromParty(partyId, userId);
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

module.exports = {
	getAllParties,
	getPartyById,
	createParty,
	updateParty,
	deleteParty,
	addUserToParty,
	removeUserFromParty,
	setPartyLeader,
	banUserFromParty,
}