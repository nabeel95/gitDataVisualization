var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var credential = process.env['git_credential'];

function readData(fileName) {
	return JSON.parse(fs.readFileSync(fileName, 'utf-8', function(err, data){}));
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false );
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function getData(url) {
	var infoExist = 1;
	var page = 1;
	var length = 0;
	while(infoExist > 0){
		urlWithAuth = url+'?page='+page+'&'+credential;
		var info = JSON.parse(httpGet(urlWithAuth));
		infoExist = info.length;
		page ++;
		length += info.length;
	}
	return length;
};


function infoFetcher(data) {
	var mapping = ['tags_url', 'forks_url', 'stargazers_url', 'contributors_url', 'subscribers_url', 'commits_url', 'downloads_url', 'issues_url', 'pulls_url'];
	var overAllInfo = [];
	var repo_info = {};
	for (var i = 0; i < 1; i++) {
		repo_info['name'] = data[i].full_name;
		for(var j=0;j< mapping.length;j++){
			console.log(data[i][mapping[j]]);
			repo_info[mapping[j]] = getData(data[i][mapping[j]]);
		}
		console.log(data[i].languages_url+'&'+credential)
		repo_info['languages_url'] = httpGet(data[i].languages_url+'?'+credential)
		overAllInfo.push(repo_info);
	}

	return overAllInfo;
}

function writeInFiles() {
	var info = readData('../data/data1.json');
	var subData = [];
	for (var i = 0; i < info.length; i++) {
		subData.push(JSON.stringify(info[i], undefined, 4));
		var breaker = [40, 80,120, 160, 199];
		if(breaker.indexOf(i) != -1) {
			var fileName = '../data/new_data'+i+'.json';
			fs.writeFileSync(fileName, subData);
			subData = [];
		}
	}
}

function fetchPublicRepos(url) {
	var info = '';
	for (var i = 6; i < 8; i++) {
		var urlWithAuth = url+'?page='+(i)+'&'+credential;
		info += httpGet(urlWithAuth);
	}
	fs.writeFileSync('../data/data1.json', info);
	writeInFiles();
};

// fetchPublicRepos("https://api.github.com/repositories")
console.log(infoFetcher(readData('../data/new_data40.json')));