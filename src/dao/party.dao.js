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
	await UserModel.updateOne({_id: userId}, {$set: {currentParty: partyId, currentRole: 'LISTENER'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {members: userId}},
		{upsert:false}
	);
}

removeUserFromParty = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentParty: null, currentRole: 'BROWSER'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$pull: {members: userId}},
		{upsert: false}
	);
}

setPartyLeader = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentParty: partyId, currentRole: 'DJ'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {members: userId}, $set: {partyLeader: userId}},
		{upsert: false}
	);
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
