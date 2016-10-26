fs = require('fs');
var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: false,
  openDevTools: {
    mode: 'detach'
  },
  waitTimeout: 10000
});

function checkIfContributer() {
  return document.getElementsByClassName('num text-emphasized')[3].innerHTML.trim() != 'Fetching contributors'
};



function execute(url){
  nightmare
    .goto(url)
    .wait(checkIfContributer)
    .evaluate(function () {
      return document.documentElement.innerHTML
    })
    .end()
    .then(function (result) {
      path = '../data/sample.html';
      fs.writeFileSync(path, String(result), 'utf8')
    })
    .catch(function (error) {console.error('Search failed:', error);});
};



var url = process.argv[2];
console.log('writing '+url)
execute(url);