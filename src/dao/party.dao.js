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

const deleteParty = async(id) => {
	const party = await PartyModel.findById(id);
	const partyMemberIds = party.memberIds;
	if (partyMemberIds.length > 0) {
		await allUsersToBrowsers(partyMemberIds);
	}
	return PartyModel.deleteOne({_id: id});
}

const addUserToParty = async(partyId, userId) => {
	const party = await PartyModel.findById(partyId);
	const bannedMemberIds = party.bannedMemberIds;
	if (bannedMemberIds.includes(userId)) {
		throw("Unable to add user to party: specified user is banned from this party");
	}
	const user = await UserModel.findById(userId);
	const userCurrentPartyId = user.currentPartyId;
	if (userCurrentPartyId) {
		await removeUserFromParty(userCurrentPartyId, userId);
	}
	const userUpdate = await UserModel.updateOne(
		{_id: userId}, 
		{$set: {currentPartyId: partyId, currentRole: 'LISTENER'}}
	);
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
	let userIsPartyLeader = false;
	const party = await PartyModel.findById(partyId);
	const partyLeaderId = party.partyLeaderId;
	const partyMemberIds = party.memberIds;
	if (!partyMemberIds.includes(userId)) {
		throw("Unable to remove user from party: specified user is not in the party");
	}
	// if the user being removed is the current partyLeader set partyLeader to null
	if (partyLeaderId && partyLeaderId.toString() === userId) {
		userIsPartyLeader = true;
		await PartyModel.updateOne(
			{_id: partyId},
			{$set: {partyLeaderId: null}},
			{upsert: false}
		)
	};
	// update user to be BROWSER associated with no parties and remove user from party member list
	const userUpdate = UserModel.updateOne(
		{_id: userId}, 
		{$set: {currentPartyId: null, currentRole: 'BROWSER'}}
	);
	const partyUpdate = PartyModel.updateOne(
		{_id: partyId},
		{$pull: {memberIds: userId}},
		{upsert: false}
	);
	Promise.all([userUpdate, partyUpdate])
		.then((response) => {
			if (userIsPartyLeader) {
				return assignNewPartyLeader(partyId);
			}
			return response;
	});
}

const setPartyLeader = async(partyId, userId) => {
	const party = await PartyModel.findById(partyId);
	const currentPartyLeaderId = party.partyLeaderId;
	if (currentPartyLeaderId && currentPartyLeaderId.toString() === userId) {
		throw("Cannot promote user: specified user is already the DJ");
	}
	if (currentPartyLeaderId) {
		await UserModel.updateOne({_id: currentPartyLeaderId}, {$set: {currentRole: 'LISTENER'}});
	}
	const userUpdate = UserModel.updateOne(
		{_id: userId}, 
		{$set: {currentPartyId: partyId, currentRole: 'DJ'}}
	);
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
	try {
		await removeUserFromParty(partyId, userId);
	} catch(error) {}
	return PartyModel.updateOne(
		{_id: partyId},
		{$addToSet: {bannedMemberIds: userId}},
		{upsert: false}
	);
}

const addSongToPlayed = async(partyId, songId) => {
	// TODO: implement addSongToPlayed
}

// helper function for deleteParty, setting all party members to BROWSERs
const allUsersToBrowsers = async(userIds) => {
	async function asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	};

	const usersToBrowsers = async () => {
		await asyncForEach(userIds, async (userId) => {
			await UserModel.updateOne(
				{_id: userId}, 
				{$set: {currentPartyId: null, currentRole: 'BROWSER'}}
			);
		});
	}

	usersToBrowsers();
}

// helper function for removeUserFromParty, handling when partyLeader is removed
const assignNewPartyLeader = async(partyId) => {
	const newParty = await PartyModel.findById(partyId);
	const partyMemberIds = newParty.memberIds;
	/**
	 * if there are still members in the party after removing the party leader then
	 * promote the first member in the list to partyLeader else there are no remaining
	 * members in the party so delete the party
	*/
	if (partyMemberIds.length !== 0) {
		return await setPartyLeader(partyId, partyMemberIds[0]);
	}
	return await PartyModel.deleteOne({_id: partyId});
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
