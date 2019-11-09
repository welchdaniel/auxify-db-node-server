const mongoose = require('mongoose');

const PartySchema = mongoose.Schema({
	name: { type: String, required: true },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	partyType: { type: String, enum: ['Autoplay', 'Requests'], required: true },
	passwordReq: { type: Boolean, required: true },
	password: String,
	partyLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	bannedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	queueId: String,
	history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
},
{ collection: 'Party' });

module.exports = PartySchema;
