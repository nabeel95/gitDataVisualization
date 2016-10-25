var categoriser = {};

categoriser.categoriseByLanguage = function (rawData) {
    var categorizedData = {};
    rawData.map(function (repo) {
        var languages = repo.languages;
        if (languages && languages.length) {
            for (i = 0; i < languages.length; i++) {
                if (!categorizedData[languages[i]]) {
                    categorizedData[languages[i]] = {"USERS": 1, "STARS": repo.star, "FORKS": repo.forks};
                }
                else {
                    categorizedData[languages[i]].USERS++;
                    categorizedData[languages[i]].STARS += repo.star;
                    categorizedData[languages[i]].FORKS += repo.forks;
                }
            }
        }
    });
    return categorizedData;
};

categoriser.categoriseByCommunity = function (rawData) {
    var categorizedData = {};
    rawData.map(function (repo) {
        if (typeof repo == "object") {
            var community = repo.name.split('/')[0];
            var project = repo.name.split('/')[1];
            if (!categorizedData[community]) {
                categorizedData[community] = {};
                categorizedData[community][project] = {
                    "CONTRIBUTORS": repo.contributers,
                    "ISSUES": repo.issues,
                    "COMMITS": repo.commits
                };
            }
            else if (categorizedData[community] && !categorizedData[community][project]) {
                categorizedData[community][project] = {
                    "CONTRIBUTORS": repo.contributers,
                    "ISSUES": repo.issues,
                    "COMMITS": repo.commits
                };
            }
            else {
                categorizedData[community][project].USERS += repo.contributers;
                categorizedData[community][project].ISSUES += repo.issues;
                categorizedData[community][project].COMMITS += repo.commits;
            }
        }
    });
    return categorizedData;
}

categoriser.languageByIssues = function (rawData) {
    var languageIssues = {};
    for (var i = 0; i < rawData.length; i++) {
        var oneRepo = rawData[i];
        var languages = oneRepo['languages'];
        if (languages && languages.length) {
            languages.forEach(function (language) {
                if (!languageIssues.hasOwnProperty(language)) {
                    languageIssues[language] = {name: language, issues: 0};
                }
                languageIssues[language]['issues'] += +oneRepo['issues'];
            });
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