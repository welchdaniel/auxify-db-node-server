const mongoose = require('mongoose');

const User = require('./user.schema');
const Song = require('./song.schema');

const PartySchema = mongoose.Schema({
	name: { type: String, required: true },
	members: [User],
	partyType: { type: String, enum: ['Autoplay', 'Requests'], required: true },
	passwordReq: { type: Boolean, required: true },
	password: String,
	partyLeader: User,
	bannedMembers: [User],
	queueId: String,
	history: [Song],
},
{ collection: 'Party' });

module.exports = PartySchema;
