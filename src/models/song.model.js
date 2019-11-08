const mongoose = require('mongoose');
const SongSchema = require('./schemas/song.schema');
const SongModel = mongoose.model('SongModel', SongSchema);

module.exports = SongModel;
