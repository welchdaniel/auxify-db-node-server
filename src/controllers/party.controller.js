const PartyService = require('../services/party.service');

const PartyController = app => {
	getAllParties = (req, res) => {
		PartyService.getAllParties()
			.then(parties => res.send(parties));
	}

	getPartyById = (req, res) => {
		PartyService.getPartyById(req.params['partyId'])
			.then(party => {res.send(party)});
	}

	createParty = (req, res) => {
		PartyService.createParty(req.body)
			.then(parties => res.send(parties));
	}

	updateParty = (req, res) => {
		PartyService.updateParty(req.params['partyId'], req.body)
			.then(status => res.send(status));
	}

	deleteParty = (req, res) => {
		PartyService.deleteParty(req.params['partyId'])
			.then(status => res.send(status));
	}

	app.get('/api/parties', getAllParties);
	app.get('/api/parties/:partyId', getPartyById);
	app.post('/api/parties', createParty);
	app.put('/api/parties/:partyId', updateParty);
	app.delete('/api/parties/:partyId', deleteParty);
}

module.exports = PartyController;
