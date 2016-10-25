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
        var oneRepo = rawData[i];
        var languages = oneRepo['languages_url'];
        for(lang in languages) {
            if(!languageIssues.hasOwnProperty(lang))
                languageIssues[lang] = {name: lang, issues_url: 0};
            languageIssues[lang]['issues_url'] += oneRepo['issues_url'];
        }
    }
    return languageIssues;
}
module.exports = categoriser;