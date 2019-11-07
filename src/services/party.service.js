const PartyDao = require('../dao/party.dao.js');

getAllParties = () => {
	return PartyDao.findAllParties();
}

module.exports = {
	getAllParties,
}