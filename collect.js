var x = require('casper').selectXPath;
var download_links = [];
var fs = require('fs');

var support_qualities = ['128kbps','320kbps','500kbps','Lossless','32kbps'];

var result = {
  '128kbps': [],
  '320kbps': [],
  '500kbps': [],
  'Lossless': [],
  '32kbps': []
};

var casper = require('casper').create({
  pageSettings: {
    loadImages:  false,// do not load images
    loadPlugins: false // do not load NPAPI plugins (Flash, Silverlight, ...)
  }
});

if (casper.cli.args.length != 3){
  casper.echo("Wrong syntex casperjs collect.js {album_url} {username} {password}")
  phantom.exit()
}

//Example url:http://playlist.chiasenhac.com/nghe-album/surrender~omar-akram~1015073.html
var album_url = casper.cli.args[0]; 
var username = casper.cli.args[1];
var password = casper.cli.args[2];

casper.echo( "Download album :" +album_url + " with username="+ username +" and password="+password );

casper.echo("Authentication user");

casper.start('http://chiasenhac.vn/login.php',function(){
 this.evaluate(function(username,password){
    	document.getElementsByName("username")[0].value = username;
    	document.getElementsByName("password")[0].value = password;
    },username,password);	
  
  this.mouse.click('input[name="login"]');

  casper.wait(5000, function() {
    this.capture("authentication_result.png", {
      top: 0,
      left: 0,
      width: 1000,
      height: 800
    });
    this.echo('redirect to album page');
  });
});

casper.thenOpen(album_url, function() {
  /*listen_links = this.getElementsAttribute('div.playlist_prv tr td span a.musictitle','href');
  casper.echo(listen_links.length);
  casper.echo(listen_links);
  */

  download_links = this.getElementsAttribute('div.playlist_prv tr td span a:first-child','href');
  casper.echo("This album have "+ download_links.length + " songs");
});

var index = -1;
casper.then(function() {
  this.eachThen(download_links, function() { 
    index++; 
    casper.echo("Opening "+ download_links[index]);
    this.thenOpen((download_links[index]), function() {
      //this.echo(this.getTitle()); // display the title of page
      file_urls = this.getElementsAttribute('div#downloadlink b a','href');
      for (var i = 0; i < file_urls.length ; i++){
        for (var j = 0; j < support_qualities.length;j++){
          if (file_urls[i].indexOf(support_qualities[j]) != -1){
            result[support_qualities[j]].push(file_urls[i]);
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

//Note: You can use  this.download("{url}", "{file_name}") instead using python to download file