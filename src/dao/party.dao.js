const PartyModel = require('../models/party.model');

findAllParties = () => {
	// TODO: Build out Party Schema
	return PartyModel.find();
}

findPartyById = (id) => {
	// TODO: Build out Party Schema
	return PartyModel.findById(id);
}

createParty = (party) => {
	// TODO: Build out Party Schema
	return PartyModel.create(party);
}

updateParty = (id, party) => {
	// TODO: Build out Party Schema
	return PartyModel.updateOne({_id: id}, {$set: party});
}

deleteParty = (id) => {
	// TODO: Build out Party Schema
	return PartyModel.findByIdAndDelete(id);
}

module.exports = {
	findAllParties,
	findPartyById,
	createParty,
	updateParty,
	deleteParty,
}
