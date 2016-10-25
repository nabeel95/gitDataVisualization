var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe("Language issue", function () {
    var rawData;
    beforeEach(function () {
        rawData = [{
            name: 'abhay/calais',
            tags_url: 13,
            forks: 46,
            star: 137,
            contributers: 13,
            subscribers_url: 6,
            commits: 129,
            downloads_url: 0,
            issues: 6,
            pulls_url: 6,
            languages: [
                "Ruby",
                "JavaScript"
            ]
        },
            {
                name: 'mojombo/chronic',
                tags_url: 22,
                forks: 330,
                star: 2564,
                contributers: 41,
                subscribers_url: 77,
                commits: 594,
                downloads_url: 0,
                issues: 112,
                pulls_url: 20,
                languages: [
                    "Ruby",
                    "JavaScript"
                ]
            }];
    });

    it("should categorise data according to the languages and issue", function () {
        var expect = JSON.stringify({
            "Ruby": {"name": "Ruby", "issues": 118},
            "JavaScript": {"name": "JavaScript", "issues": 118}
        });
        var actual = JSON.stringify(categoriser.languageByIssues(rawData));
        assert.equal(expect, actual);
    })
});