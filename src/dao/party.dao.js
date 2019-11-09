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
	const userUpdate = await UserModel.updateOne({_id: userId}, {$set: {currentPartyId: partyId, currentRole: 'LISTENER'}});
	const partyUpdate = PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {memberIds: userId}},
		{upsert:false}
	);
	Promise.all([userUpdate, partyUpdate])
		.then((response) => {
			return response;
	});
}

removeUserFromParty = async(partyId, userId) => {
	const userUpdate = UserModel.updateOne({_id: userId}, {$set: {currentPartyId: null, currentRole: 'BROWSER'}});
	const partyUpdate = PartyModel.updateOne(
		{_id: partyId},
		{$pull: {memberIds: userId}},
		{upsert: false}
	);
	Promise.all([userUpdate, partyUpdate])
		.then((response) => {
			return response;
	});
}

setPartyLeader = async(partyId, userId) => {
	const party = await PartyModel.findById(partyId);
	const currentPartyLeaderId = party.partyLeaderId;
	if (currentPartyLeaderId === userId) {
		throw "Specified user is already the DJ";
	}
	if (currentPartyLeaderId) {
		await UserModel.updateOne({_id: currentPartyLeaderId}, {$set: {currentRole: 'LISTENER'}});
	}
	const userUpdate = UserModel.updateOne({_id: userId}, {$set: {currentPartyId: partyId, currentRole: 'DJ'}});
	const partyUpdate = PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {memberIds: userId}, $set: {partyLeaderId: userId}},
		{upsert: false}
	);
	Promise.all([userUpdate, partyUpdate])
		.then((response) => {
			return response;
	});
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
