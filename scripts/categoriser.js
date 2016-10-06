var categoriser = {};

categoriser.categoriseByLanguage = function(rawData) {
	var categorizedData = {};
	rawData.map(function(repo) {
		for(i = 0;i<repo.languages.length;i++) {
		if(!categorizedData[repo.languages[i]]) {
			categorizedData[repo.languages[i]] = {"USERS": 1, "STARS": repo.stars, "FORKS": repo.forks};
		}
		else{
			categorizedData[repo.languages[i]].USERS++;
			categorizedData[repo.languages[i]].STARS+=repo.stars;
			categorizedData[repo.languages[i]].FORKS+=repo.forks;
		}
	}
});
	return categorizedData;
};

module.exports = categoriser;