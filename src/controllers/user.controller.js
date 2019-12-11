const UserService = require('../services/user.service');

const UserController = app => {
	getAllUsers = (req, res) => {
		UserService.getAllUsers()
			.then(users => res.send(users));
	}

	getUserByUsername = (req, res) => {
		UserService.getUserByUsername(req.body.username)
			.then(user => res.send(user));
	}

	getUserById = (req, res) => {
		UserService.getUserById(req.params['userId'])
			.then(user => {res.send(user)});
	}

	createUser = (req, res) => {
		UserService.createUser(req.body)
			.then(user => res.send(user));
	}

	updateUser = (req, res) => {
		UserService.updateUser(req.params['userId'], req.body)
			.then(status => res.send(status));
	}

	deleteUser = (req, res) => {
		UserService.deleteUser(req.params['userId'])
			.then(status => res.send(status));
	}

	addSongToRecent = (req, res) => {
		UserService.addSongToRecent(req.params['userId'], req.body.songId)
			.then(status => res.send(status));
	}

	login = (req, res) => {
		// TODO: password encryption
		UserService.login(req.body.username, req.body.password)
			.then(response => res.send(response));
	}

	app.get('/api/users', getAllUsers);
	app.post('/api/users/getByUsername', getUserByUsername);
	app.get('/api/users/:userId', getUserById);
	app.post('/api/users', createUser);
	app.put('/api/users/:userId', updateUser);
	app.delete('/api/users/:userId', deleteUser);

	app.put('/api/users/:userId/addSongToRecent', addSongToRecent)

	app.post('/api/login', login);
}

module.exports = UserController;
