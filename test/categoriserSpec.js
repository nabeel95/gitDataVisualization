var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe('categoriser', function () {
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
                         languages_url: '{"Ruby":24665}' },
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
                          languages_url: '{"Ruby":190560}' }];
    });

    describe('categoriseByLanguage', function () {
        it('should categorise data according to the languages', function () {

            var expected = JSON.stringify({
                    "Ruby": {"USERS": 2, "STARS": 137 + 2564, "FORKS": 46 + 330},
                });
            var actualData = JSON.stringify(categoriser.categoriseByLanguage(rawData));
            assert.equal(expected, actualData);
        });

     describe('categoriseByCommunity', function () {
         it('should categorise data according to community or indivisual', function () {
            var expected = JSON.stringify({
                "abhay": {"calais": {"CONTRIBUTORS": 13, "ISSUES": 6, "SUBSCRIBERS": 6, "COMMITS": 129}},
                "mojombo": {"chronic": {"CONTRIBUTORS": 41, "ISSUES": 112, "SUBSCRIBERS": 77, "COMMITS": 594}}
            })
             var actualData = JSON.stringify(categoriser.categoriseByCommunity(rawData));
             assert.equal(expected, actualData);
         })
     })

    });
});