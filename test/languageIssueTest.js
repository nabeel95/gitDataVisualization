var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe("Language issue", function(){
	var rawData;
    beforeEach(function () {
            rawData = [{ name: 'abhay/calais',
                         tags_url: 13,
                         forks_url: 46,
                         stargazers_url: 137,
                         contributors_url: 13,
                         subscribers_url: 6,
                         commits_url: 129,
                         downloads_url: 0,
                         issues_url: 6,
                         pulls_url: 6,
                         languages_url: {"Ruby":24665} },
                        { name: 'mojombo/chronic',
                          tags_url: 22,
                          forks_url: 330,
                          stargazers_url: 2564,
                          contributors_url: 41,
                          subscribers_url: 77,
                          commits_url: 594,
                          downloads_url: 0,
                          issues_url: 112,
                          pulls_url: 20,
                          languages_url: {"Ruby":190560} }];
    });
	it("should categorise data according to the languages and issue", function () {
		var expect = JSON.stringify({'Ruby': {'name': 'Ruby', 'issues_url': 118}});
		var actual = JSON.stringify(categoriser.languageByIssues(rawData)); 
		assert.equal(expect, actual);
	})
});