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
	await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: partyId, currentRole: 'LISTENER'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {memberIds: userId}},
		{upsert:false}
	);
}

removeUserFromParty = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: null, currentRole: 'BROWSER'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$pull: {memberIds: userId}},
		{upsert: false}
	);
}

setPartyLeader = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: partyId, currentRole: 'DJ'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {memberIds: userId}, $set: {partyLeaderId: userId}},
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
