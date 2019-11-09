const PartyModel = require('../models/party.model');
const UserModel = require('../models/user.model');

const findAllParties = () => {
	return PartyModel.find();
}

const findPartyById = (id) => {
	return PartyModel.findById(id);
}

const createParty = (party) => {
	return PartyModel.create(party);
}

const updateParty = (id, party) => {
	return PartyModel.updateOne({_id: id}, {$set: party});
}

const deleteParty = (id) => {
	return PartyModel.deleteOne({_id: id});
}

const addUserToParty = async(partyId, userId) => {
	const party = await PartyModel.findById(partyId);
	const bannedMemberIds = party.bannedMemberIds;
	if (bannedMemberIds.includes(userId)) {
		throw("Unable to add user to party: specified user is banned from this party");
	}
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

const removeUserFromParty = async(partyId, userId) => {
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

const setPartyLeader = async(partyId, userId) => {
	const party = await PartyModel.findById(partyId);
	const currentPartyLeaderId = party.partyLeaderId.toString();
	if (currentPartyLeaderId === userId) {
		throw("Cannot promote user: specified user is already the DJ");
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

const banUserFromParty = async(partyId, userId) => {
	await removeUserFromParty(partyId, userId);
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {bannedMemberIds: userId}},
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
	banUserFromParty,
}
