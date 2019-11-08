const SongModel = require('../models/song.model');

findAllSongs = () => {
	return SongModel.find();
}

findSongById = (id) => {
	return SongModel.findById(id);
}

createSong = (song) => {
	return SongModel.create(song);
}

updateSong = (id, song) => {
	return SongModel.updateOne({_id: id}, {$set: song});
}

deleteSong = (id) => {
	return SongModel.findByIdAndDelete(id);
}

module.exports = {
	findAllSongs,
	findSongById,
	createSong,
	updateSong,
	deleteSong,
}
