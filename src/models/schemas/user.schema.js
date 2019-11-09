const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	firstName: String,
	lastName: String,
	currentPartyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Party' },
	currentRole: { type: String, enum: ['BROWSER', 'LISTENER', 'DJ', 'ADMIN'], required: true },
	dob: String,
	profilePicturePath: String,
	spotifyUser: Boolean,
	spotifyUsername: String,
	spotifyUrl: String,
	recentTrackIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
}, { collection: 'User' });

module.exports = UserSchema;