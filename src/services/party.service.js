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

module.exports = {
	getAllParties,
	getPartyById,
	createParty,
	updateParty,
	deleteParty,
}