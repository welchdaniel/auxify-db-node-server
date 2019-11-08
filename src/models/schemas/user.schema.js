const mongoose = require('mongoose');

const Song = require('./song.schema');

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	firstName: String,
	lastName: String,
	currentPartyId: String,
	currentRole: { type: String, enum: ['DJ', 'LISTENER', 'ADMIN'], required: true },
	dob: String,
	profilePicturePath: String,
	spotifyUser: Boolean,
	spotifyUsername: String,
	spotifyUrl: String,
	recentTracks: [Song],
}, {collection: 'User'});

module.exports = UserSchema;