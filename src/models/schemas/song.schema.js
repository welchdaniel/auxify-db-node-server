const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
	spotifyId: { type: String, required: true },
	name: { type: String, required: true },
	artistNames: [String],
	albumTitle: String,
	duration: Number,
	explicit: Boolean,
	popularityScore: Number,
	isPlayable: Boolean,
	spotifyListenUrl: String,
	upvotes: Number,
	downvotes: Number
},
{ collection: 'Song' });

module.exports = SongSchema;