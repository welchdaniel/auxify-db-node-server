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
			.then(response => {res.send(response)})
			.catch(response => {res.status(response.status).send(response.message)});
	}

	removeUserFromParty = (req, res) => {
		PartyService.removeUserFromParty(req.params['partyId'], req.body.userId)
			.then(status => {res.send(status)})
			.catch(response => {res.status(response.status).send(response.message)});
	}
	
	setPartyLeader = (req, res) => {
		PartyService.setPartyLeader(req.params['partyId'], req.body.userId)
			.then(status => {res.send(status)})
			.catch(response => {res.status(response.status).send(response.message)});
	}

	banUserFromParty = (req, res) => {
		PartyService.banUserFromParty(req.params['partyId'], req.body.userId)
			.then(status => {res.send(status)});
	}

	addSongToPlayed = (req, res) => {
		PartyService.addSongToPlayed(req.params['partyId'], req.params['songId'])
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
	app.put('/api/parties/:partyId/banUser', banUserFromParty);
	app.put('/api/parties/:partyId/song/:songId', addSongToPlayed);
}

module.exports = PartyController;
