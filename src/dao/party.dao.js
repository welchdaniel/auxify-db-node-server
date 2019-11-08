const PartyModel = require('../models/party.model');

findAllParties = () => {
	return PartyModel.find();
}

findPartyById = (id) => {
	return PartyModel.findById(id);
}

createParty = (party) => {
	return PartyModel.create(party);
}

updateParty = (id, party) => {
	return PartyModel.updateOne({_id: id}, {$set: party});
}

deleteParty = (id) => {
	return PartyModel.findByIdAndDelete(id);
}

module.exports = {
	findAllParties,
	findPartyById,
	createParty,
	updateParty,
	deleteParty,
}
