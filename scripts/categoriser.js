var categoriser = {};

categoriser.categoriseByLanguage = function (rawData) {
    var categorizedData = {};
    rawData.map(function (repo) {
        for (i = 0; i < repo.languages.length; i++) {
            if (!categorizedData[repo.languages[i]]) {
                categorizedData[repo.languages[i]] = {"USERS": 1, "STARS": repo.stars, "FORKS": repo.forks};
            }
            else {
                categorizedData[repo.languages[i]].USERS++;
                categorizedData[repo.languages[i]].STARS += repo.stars;
                categorizedData[repo.languages[i]].FORKS += repo.forks;
            }
        }
    });
    return categorizedData;
};

categoriser.categoriseByProject = function(rawData) {
    var categorizedData = {};
    rawData.map(function (repo) {
        var projectName = repo.name.split('/')[1];
            if (!categorizedData[projectName]) {
                categorizedData[projectName] = {"CONTRIBUTORS": repo.contributors, "ISSUES": repo.issues};
            }
            else {
                categorizedData[projectName].USERS += repo.contributors;
                categorizedData[projectName].ISSUES += repo.issues;
            }
    });
    return categorizedData;
}
module.exports = categoriser;