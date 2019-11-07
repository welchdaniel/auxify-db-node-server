const mongoose = require('mongoose');

const PartySchema = mongoose.Schema({
	name: { type: String, required: true },
	// TODO: Add users as members
	members: [Number],
	passwordReq: { type: Boolean, required: true },
	password: String,
	// TODO: Add user as leader of party
	partyLeader: Number,
	// TODO: Add users as banned members
	bannedMembers: [Number],
	// TODO: Revisit queue structure
	queue: {
		type: [{
			trackName: String,
			artistName: String,
			spotifyId: String,
			upvotes: Number,
			downvotes: Number
		}]
	},
},
	{ collection: 'Party' });

module.exports = PartySchema;