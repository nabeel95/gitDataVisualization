var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe('categoriser', function () {
    var rawData;
    beforeEach(function () {
            rawData = [{ name: 'abhay/calais',
                         tags_url: 13,
                         forks: 46,
                         star: 137,
                         contributers: 13,
                         subscribers_url: 6,
                         commits: 129,
                         downloads_url: 0,
                         issues: 6,
                         pulls_url: 6,
                         languages: ["Ruby"] },
                        { name: 'mojombo/chronic',
                          tags_url: 22,
                          forks: 330,
                          star: 2564,
                          contributers: 41,
                          subscribers_url: 77,
                          commits: 594,
                          downloads_url: 0,
                          issues: 112,
                          pulls_url: 20,
                          languages: ["Ruby"] }];
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
                "abhay": {"calais": {"CONTRIBUTORS": 13, "ISSUES": 6, "COMMITS": 129}},
                "mojombo": {"chronic": {"CONTRIBUTORS": 41, "ISSUES": 112, "COMMITS": 594}}
            })
             var actualData = JSON.stringify(categoriser.categoriseByCommunity(rawData));
             assert.equal(expected, actualData);
         });
     });

    });
});