var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe('categoriser', function () {
    describe('categoriseByLanguage', function () {
        it('should categorise data according to the languages', function () {
            var rawData = [{
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
            var expected = JSON.stringify({
                    "Javascript": {"USERS": 2, "STARS": 234234 * 2, "FORKS": 5576},
                    "Scala": {"USERS": 1, "STARS": 234234, "FORKS": 2342},
                });
            var actualData = JSON.stringify(categoriser.categoriseByLanguage(rawData));
            assert.equal(expected, actualData);
        });
    });
});