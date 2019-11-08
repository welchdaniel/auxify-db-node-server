const UserDao = require('../dao/user.dao.js');

getAllUsers = () => {
	return UserDao.findAllUsers();
}

getUserById = (id) => {
	return UserDao.findUserById(id);
}

createUser = (user) => {
	return UserDao.createUser(user);
}

updateUser = (id, user) => {
	return UserDao.updateUser(id, user);
}

deleteUser = (id) => {
	return UserDao.deleteUser(id);
}

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}
