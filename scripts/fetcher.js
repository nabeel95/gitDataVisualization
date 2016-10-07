var fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var credential = process.env['git_credential'];
var fileByArg = process.argv.slice(2)[0];

function readData(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf-8', function (err, data) {
    }));
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getData(url) {
    var infoExist = 1;
    var page = 1;
    var length = 0;
    while (infoExist > 0) {
        urlWithAuth = url + '?page=' + page + '&' + credential;
        var info = JSON.parse(httpGet(urlWithAuth));
        infoExist = info.length;
        console.log('hitting url - ' + url + ' length = ' + infoExist);
        page++;
        length += info.length;
    }
    return length;
};


function infoFetcher(data) {
    var mapping = ['tags_url', 'forks_url', 'stargazers_url', 'contributors_url', 'subscribers_url', 'commits_url', 'downloads_url', 'issues_url', 'pulls_url'];
    var overAllInfo = [];
    for (var i = 0; i < data.length; i++) {
        var repo_info = {};
        repo_info['name'] = data[i].full_name;
        for (var j = 0; j < mapping.length; j++) {
            repo_info[mapping[j]] = getData(data[i][mapping[j]]);
        }
        repo_info['languages_url'] = httpGet(data[i].languages_url + '?' + credential)
        overAllInfo.push(repo_info);
    }
    var fileToWrite = fileByArg.replace('raw', 'final');
    fs.writeFileSync(fileToWrite, JSON.stringify(overAllInfo));
    return overAllInfo;
}

function writeInFiles() {
    var info = readData('../data/data1.json');
    var subData = [];
    for (var i = 0; i < info.length; i++) {
        subData.push(JSON.stringify(info[i], undefined, 4));
        var breaker = [40, 80, 120, 160, 199];
        if (breaker.indexOf(i) != -1) {
            var fileToWrite = fileByArg.replace('raw', 'final');
            fs.writeFileSync(fileName, subData);
            subData = [];
        }
    }
}

function fetchPublicRepos(url) {
    var info = '';
    for (var i = 6; i < 8; i++) {
        var urlWithAuth = url + '?page=' + (i) + '&' + credential;
        info += httpGet(urlWithAuth);
    }
    fs.writeFileSync('../data/data1.json', info);
    writeInFiles();
};

function seperateIntoFive(fileName) {
    var data = readData('../data/new_data120.json');
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        arr.push(data[i]);
        var indexes = [5, 10, 15, 20, 26];
        if (indexes.indexOf(i) != -1) {
            fs.writeFileSync('../nabeelData/raw_' + i + '.json', JSON.stringify(arr));
            arr = [];
        }
    }
}

// console.log(fileByArg, fileByArg.replace('raw', 'final'));
// infoFetcher(readData(fileByArg));
