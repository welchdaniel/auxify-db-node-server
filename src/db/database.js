module.exports = function () {
	const mongoose = require('mongoose');
	const databaseName = 'auxify';
	let connectionString = 'mongodb://localhost/';
	connectionString += databaseName;

	try {
		mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
	} catch (error) {
		console.log('Unable to Connect to Mongo: ', error);
	}
};
