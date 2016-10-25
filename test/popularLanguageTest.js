var assert = require('assert');
var categoriser = require('../scripts/categoriser');

describe("Popular Language", function(){
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
        }
        // {
        //   "commits": 25,
        //   "branches": 5,
        //   "release": 132,
        //   "contributers": 0,
        //   "watch": 118,
        //   "star": 2,
        //   "forks": 607,
        //   "issues": "204",
        //   "pulls": "3",
        //   "languages": [
        //     "Ruby",
        //     "C++",
        //     "C",
        //     "Perl",
        //     "HTML",
        //     "Groff",
        //     "Shell",
        //     "Python",
        //     "Makefile",
        //     "DTrace",
        //     "GDB",
        //     "Batchfile",
        //     "Objective-C"
        //   ],
        //   "name": "rubinius/rubinius"
        // }
        ];
    });
	it("should categorise data according to the language and stars", function () {
		var expect = JSON.stringify({"Ruby":{"count":2,"star":406},"JavaScript":{"count":1,"star":405}});
		var actual = JSON.stringify(categoriser.popularLanguage(rawData)); 
		assert.equal(expect, actual);
	})
});