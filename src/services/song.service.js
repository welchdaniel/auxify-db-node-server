const SongDao = require('../dao/song.dao.js');

getAllSongs = () => {
	return SongDao.findAllSongs();
}

getSongById = (id) => {
	return SongDao.findSongById(id);
}

createSong = (song) => {
	return SongDao.createSong(song);
}

updateSong = (id, song) => {
	return SongDao.updateSong(id, song);
}

deleteSong = (id) => {
	return SongDao.deleteSong(id);
}

module.exports = {
	getAllSongs,
	getSongById,
	createSong,
	updateSong,
	deleteSong,
}
