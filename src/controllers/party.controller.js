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

	addUserToParty = (req, res) => {
		PartyService.addUserToParty(req.params['partyId'], req.body.userId)
			.then(status => {res.send(status)});
	}

	removeUserFromParty = (req, res) => {
		PartyService.removeUserFromParty(req.params['partyId'], req.body.userId)
			.then(status => {res.send(status)});
	}
	
	setPartyLeader = (req, res) => {
		PartyService.setPartyLeader(req.params['partyId'], req.body.userId)
			.then(status => {res.send(status)});
	}

	app.get('/api/parties', getAllParties);
	app.get('/api/parties/:partyId', getPartyById);
	app.post('/api/parties', createParty);
	app.put('/api/parties/:partyId', updateParty);
	app.delete('/api/parties/:partyId', deleteParty);

	app.put('/api/parties/:partyId/addUser', addUserToParty);
	app.put('/api/parties/:partyId/removeUser', removeUserFromParty);
	app.put('/api/parties/:partyId/setDJ', setPartyLeader);
}

module.exports = PartyController;
