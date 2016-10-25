var categoriser = {};

categoriser.categoriseByLanguage = function (rawData) {
    var categorizedData = {};
    rawData.map(function (repo) {
        var languages = Object.keys(JSON.parse(repo.languages_url));
        for (i = 0; i < languages.length; i++) {
            if (!categorizedData[languages[i]]) {
                categorizedData[languages[i]] = {"USERS": 1, "STARS": repo.stargazers_url, "FORKS": repo.forks_url};
            }
            else {
                categorizedData[languages[i]].USERS++;
                categorizedData[languages[i]].STARS += repo.stargazers_url;
                categorizedData[languages[i]].FORKS += repo.forks_url;
            }
        }
    });
    return categorizedData;
};

categoriser.categoriseByCommunity = function(rawData) {
    var categorizedData = {};
    rawData.map(function (repo) {
        var community = repo.name.split('/')[0];
        var project = repo.name.split('/')[1];
            if (!categorizedData[community]) {
                categorizedData[community] = {};
                categorizedData[community][project] = {"CONTRIBUTORS": repo.contributors_url, "ISSUES": repo.issues_url, "SUBSCRIBERS": repo.subscribers_url, "COMMITS": repo.commits_url};
            }
            else {
                categorizedData[community][project].USERS += repo.contributors_url;
                categorizedData[community][project].ISSUES += repo.issues_url;
                categorizedData[community][project].SUBSCRIBERS += repo.subscribers_url;
                categorizedData[community][project].COMMITS += repo.commits_url;
            }
    });
    return categorizedData;
}

categoriser.languageByIssues = function(rawData) {
    var languageIssues = {};
    for (var i = 0; i < rawData.length; i++) {
        var data = rawData[i];
        var languages = data['languages'];
        for(var j = 0; j < languages.length; j++){
            language = languages[j];
            if(languageIssues.hasOwnProperty(language)){
                languageIssues[language]['issues'] += parseInt(data['issues']);
            }
            else{
                languageIssues[language] = {issues: parseInt(data['issues'])};
            }
        }
    }
    return languageIssues;
}

categoriser.popularLanguage = function(rawData){
    var popularLanguages = {};
    for(var i = 0; i < rawData.length; i++){
        var data = rawData[i];
        var languages = data["languages"];
        for(var j = 0; j < languages.length; j++){
            language = languages[j];
            if(popularLanguages.hasOwnProperty(language)){
                popularLanguages[language]['count'] ++;
                popularLanguages[language]['star'] += data['star'];
            }
            else{
                popularLanguages[language]={count : 1, star : data['star']};
            }

        }
    }
    return popularLanguages;
}

module.exports = categoriser;