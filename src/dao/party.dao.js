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
	const user = await UserModel.findById(userId);
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {members: user}},
		{upsert:false}
	);
}

removeUserFromParty = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: null, currentRole: 'BROWSER'}});
	return PartyModel.updateOne(
		{_id: partyId},
		{$pull: {members: {_id: userId}}},
		{upsert: false}
	);
}

setPartyLeader = async(partyId, userId) => {
	await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: partyId, currentRole: 'DJ'}});
	const user = await UserModel.findById(userId);
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {members: user}, $set: {partyLeader: user}},
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
