const mongoose = require('mongoose');
const PartySchema = require('./schemas/party.schema');
const PartyModel = mongoose.model('PartyModel', PartySchema);

module.exports = PartyModel;
