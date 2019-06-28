var x = require('casper').selectXPath;
var download_links = [];
var fs = require('fs');

var support_qualities = ['128kbps','320kbps','500kbps'];

var result = {
  '128kbps': [],
  '320kbps': [],
  '500kbps': []
};

var casper = require('casper').create({
  pageSettings: {
    loadImages:  false,// do not load images
    loadPlugins: false // do not load NPAPI plugins (Flash, Silverlight, ...)
  }
});

if (casper.cli.args.length != 1){
  casper.echo("Wrong syntex casperjs collect.js {album_url}")
  phantom.exit()
}

//Example url:http://playlist.chiasenhac.com/nghe-album/surrender~omar-akram~1015073.html
var album_url = casper.cli.args[0]; 

casper.echo( "Download album :" +album_url );



casper.start(album_url, function() {
  
  download_links = this.getElementsAttribute('div.d-table .card-footer .name a:first-child','href');
  casper.echo("This album have "+ download_links.length + " songs");
});

var index = -1;

function getLinks() {
  var links = document.querySelectorAll('ul.download_status li a');
  return Array.prototype.map.call(links, function(e) {
      return e.getAttribute('href')
  });
}
function getTexts() {
  var links = document.querySelectorAll('ul.download_status li a');
  return Array.prototype.map.call(links, function(e) {
      return e.text
  });
}

casper.then(function() {
  this.eachThen(download_links, function() { 
    index++; 
    casper.echo("Opening "+ download_links[index]);
    this.thenOpen((download_links[index]), function() {
      //this.echo(this.getTitle()); // display the title of page
      // download_status
      file_urls = this.getElementsAttribute('ul.download_status li a','href');
      // console.log("file_urls",JSON.stringify(file_urls))
      links = this.evaluate(getLinks);
      texts = this.evaluate(getTexts);
      for(var i = 0; i < links.length; i++){
          for (var j = 0; j < support_qualities.length;j++){
            if (texts[i].indexOf(support_qualities[j]) != -1){
              result[support_qualities[j]].push(links[i]);
            }
          }
      }
    
    });
  });
});

casper.then(function(){
  casper.echo("Done, writing to file");
  fs.write('data.txt', JSON.stringify(result), 'w');
});

casper.run();

// 