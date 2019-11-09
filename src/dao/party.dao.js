const PartyModel = require('../models/party.model');
const UserModel = require('../models/user.model');

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
	return PartyModel.deleteOne({_id: id});
}

addUserToParty = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: partyId}});
	const user = await UserModel.findById(userId);
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {members: user}},
		{new:true, upsert:true}
	);
}

removeUserFromParty = (partyId, userId) => {

}

setPartyLeader = (partyId, userId) => {

}

module.exports = {
	findAllParties,
	findPartyById,
	createParty,
	updateParty,
	deleteParty,
	addUserToParty,
	removeUserFromParty,
	setPartyLeader,
}
