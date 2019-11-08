var express = require('express');
var bodyParser = require('body-parser');
const ConnectMongo = require('./src/db/database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

ConnectMongo();

const UserController = require('./src/controllers/user.controller');
const SongController = require('./src/controllers/song.controller');
const PartyController = require('./src/controllers/party.controller');

UserController(app);
SongController(app);
PartyController(app);

app.listen(process.env.PORT || 3001);
