var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe("Language issue", function(){
	var rawData;
    beforeEach(function () {
            rawData = [{
                "commits": 516,
                "branches": 3,
                "release": 15,
                "contributers": 44,
                "watch": 58,
                "star": 1,
                "forks": 452,
                "issues": "2",
                "pulls": "1",
                "languages": [
                  "Ruby"
                ],
                "name": "mojombo/grit"
              },
              {
                "commits": 1,
                "branches": 14,
                "release": 9,
                "contributers": 0,
                "watch": 4,
                "star": 405,
                "forks": 55,
                "issues": "0",
                "pulls": "0",
                "languages": [
                  "Ruby",
                  "JavaScript"
                ],
                "name": "wycats/merb-core"
              }];
    });
	it("should categorise data according to the languages and issue", function () {
		var expect = JSON.stringify({"Ruby":{"issues":2},"JavaScript":{"issues":0}});
		var actual = JSON.stringify(categoriser.languageByIssues(rawData)); 
		assert.equal(expect, actual);
	})
});