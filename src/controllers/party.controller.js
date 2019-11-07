const PartyService = require('../services/party.service');

module.exports = app => {
	getAllParties = (req, res) => {
		PartyService.getAllParties()
			.then(parties => res.send(parties));
	}

	app.get('/api/parties', getAllParties);
}
