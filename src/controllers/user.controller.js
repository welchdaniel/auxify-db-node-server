const UserService = require('../services/user.service');

const UserController = app => {
	getAllUsers = (req, res) => {
		UserService.getAllUsers()
			.then(users => res.send(users));
	}

	getUserById = (req, res) => {
		UserService.getUserById(req.params['userId'])
			.then(user => {res.send(user)});
	}

	createUser = (req, res) => {
		UserService.createUser(req.body)
			.then(users => res.send(users));
	}

	updateUser = (req, res) => {
		UserService.updateUser(req.params['userId'], req.body)
			.then(status => res.send(status));
	}

	deleteUser = (req, res) => {
		UserService.deleteUser(req.params['userId'])
			.then(status => res.send(status));
	}

	app.get('/api/users', getAllUsers);
	app.get('/api/users/:userId', getUserById);
	app.post('/api/users', createUser);
	app.put('/api/users/:userId', updateUser);
	app.delete('/api/users/:userId', deleteUser);
}

module.exports = UserController;
