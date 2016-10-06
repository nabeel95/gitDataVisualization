var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var credential = process.env['git_credential']


function readData(fileName) {
	return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
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


function infoFetcher() {
	var data = readData('./fullData.json');
	var mapping = ['collaborators_url'];
	var info = {};
	for (var i = 0; i < 1; i++) {
		info['name'] = data[i].full_name;
		for(var j=0;j< mapping.length;j++){
			console.log(data[i][mapping[j]]);
			info[mapping[j]] = getData(data[i][mapping[j]]);
		}
	}
	return info;
}

