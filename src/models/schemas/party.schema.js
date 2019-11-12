const mongoose = require('mongoose');

const PartySchema = mongoose.Schema({
	name: { type: String, required: true },
	memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	partyType: { type: String, enum: ['Autoplay', 'Requests'], required: true },
	passwordReq: { type: Boolean, required: true },
	password: String,
	partyLeaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	bannedMemberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	queueId: String,
	playedSongsCount: Number,
	playedSongs: [
		{
			listOrder: Number,
			songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
			numLikes: Number,
			numDislikes: Number,
		}
	],
},
{ collection: 'Party' });

module.exports = PartySchema;
