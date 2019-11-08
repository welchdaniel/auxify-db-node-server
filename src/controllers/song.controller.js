const SongService = require('../services/song.service');

const SongController = app => {
	getAllSongs = (req, res) => {
		SongService.getAllSongs()
			.then(songs => res.send(songs));
	}

	getSongById = (req, res) => {
		SongService.getSongById(req.params['songId'])
			.then(song => {res.send(song)});
	}

	createSong = (req, res) => {
		SongService.createSong(req.body)
			.then(songs => res.send(songs));
	}

	updateSong = (req, res) => {
		SongService.updateSong(req.params['songId'], req.body)
			.then(status => res.send(status));
	}

	deleteSong = (req, res) => {
		SongService.deleteSong(req.params['songId'])
			.then(status => res.send(status));
	}

	app.get('/api/songs', getAllSongs);
	app.get('/api/songs/:songId', getSongById);
	app.post('/api/songs', createSong);
	app.put('/api/songs/:songId', updateSong);
	app.delete('/api/songs/:songId', deleteSong);
}

module.exports = SongController;
