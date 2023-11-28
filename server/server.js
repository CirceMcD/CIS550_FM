const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));
// Added the following 2 lines per https://stackoverflow.com/questions/41955103/cant-get-post-data-using-nodejs-expressjs-and-postman
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
// TODO - Used examples from https://expressjs.com/en/4x/api.html#path-examples for POST but have not tested yet
// TODO - Basically, change to app.post on server.js, and use req.body to extract params in routes.js
app.get('/communityResilienceSuggest', routes.communityResilienceSuggest);
app.post('/communityResiliencePost', routes.communityResiliencePost);
app.get('/censusTractFilterSuggest', routes.censusTractFilterSuggest);
app.post('/censusTractFilterPost', routes.censusTractFilterPost);
app.get('/highestRiskCensusTracts/:page/:pageSize', routes.highestRiskCensusTracts);            // default page = 1, pageSize = 10
app.get('/highestMigrationCensusTracts/:page/:pageSize', routes.highestMigrationCensusTracts);  // default page = 1, pageSize = 10
app.get('/averageClimateRiskByIncome/:page/:pageSize', routes.averageClimateRiskByIncome);      // default page = 1, pageSize = 10
app.get('/averageClimateRiskByState/:page/:pageSize', routes.averageClimateRiskByState);        // default page = 1, pageSize = 10

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;