const PartyDao = require('../dao/party.dao.js');
const UserDao = require('../dao/user.dao');

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

addUserToParty = (partyId, userId) => {
	return PartyDao.addUserToParty(partyId, userId);
}

removeUserFromParty = (partyId, userId) => {
	return PartyDao.removeUserFromParty(partyId, userId);
}

setPartyLeader = (partyId, userId) => {
	return PartyDao.setPartyLeader(partyId, userId);
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
}