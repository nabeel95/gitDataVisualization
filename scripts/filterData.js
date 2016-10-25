var categoriser = require('./categoriser');
var fs = require('fs');
var dataFile = '../data/4500.json';
var rawData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

var languageData = categoriser.categoriseByLanguage(rawData);
var communityData = categoriser.categoriseByCommunity(rawData);
var issuesData = categoriser.languageByIssues(rawData);

console.log(languageData);