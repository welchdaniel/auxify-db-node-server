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

addSongToRecent = (userId, songId) => {
	return UserDao.addSongToRecent(userId, songId);
}

login = async(username, password) => {
	// TODO: password encryption
	try {
		const user = await UserDao.login(username, password);
		return {status: '200', body: {user: user}};
	} catch(error) {
		return {status: '401', message: error};
	}
}

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addSongToRecent,
	login,
}
