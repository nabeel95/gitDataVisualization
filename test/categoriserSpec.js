var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe('categoriser', function () {
    var rawData;
    beforeEach(function () {
            rawData = [{
                name: 'facebook/nuclied',
                forks: 3234,
                stars: 234234,
                languages: ['Javascript'],
                contributors: 23,
                issues: 200
            },
                {
                    name: 'facebook/gogo',
                    forks: 2342,
                    stars: 234234,
                    languages: ['Scala', 'Javascript'],
                    contributors: 23,
                    issues: 433
                }];
    });

    describe('categoriseByLanguage', function () {
        it('should categorise data according to the languages', function () {

            var expected = JSON.stringify({
                    "Javascript": {"USERS": 2, "STARS": 234234 * 2, "FORKS": 5576},
                    "Scala": {"USERS": 1, "STARS": 234234, "FORKS": 2342},
                });
            var actualData = JSON.stringify(categoriser.categoriseByLanguage(rawData));
            assert.equal(expected, actualData);
        });

     describe('categoriseByProject', function () {
         it('should categorise data according to projects', function () {
            var expected = JSON.stringify({
                "nuclied": {"CONTRIBUTORS": 23, "ISSUES": 200},
                "gogo": {"CONTRIBUTORS": 23, "ISSUES": 433}
            })
             var actualData = JSON.stringify(categoriser.categoriseByProject(rawData));
             assert.equal(expected, actualData);
         })
     })
    });
});