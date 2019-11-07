const PartyModel = require('../models/party.model');

findAllParties = () => {
	return PartyModel.find();
}

module.exports = {
	findAllParties,
}
