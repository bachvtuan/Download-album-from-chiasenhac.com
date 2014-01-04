Download entire songs in  album from website chiasenhac.com
=================================================

This project allow you download whole songs in a album on website http://chiasenhac.com include lossess songs.

How it work :
-------------
1. You register an account at http://chiasenhac.com( Remember confirm if needed )
2. Download phantomjs and casperjs, setup properly. You can check casperjs work by command "casperjs --version"
3. Pick any alblum url at chiasenhac.com such as "http://playlist.chiasenhac.com/nghe-album/surrender~omar-akram~1015073.html"
4.Install python 2.7 and install additional module "urllib2"
5. Run command casperjs --disk-cache=true collect.js {1} {2} {3} && python download.py {4} {5} .Explain:
 {1}: album url such as http://playlist.chiasenhac.com/nghe-album/surrender~omar-akram~1015073.html
 {2},{3}: your username and password are registed to website
 {4}: Audio quality (32,128,320,500,lossless)
 {5} folder to save album

eg: casperjs --disk-cache=true collect.js http://playlist.chiasenhac.com/nghe-album/surrender~omar-akram~1015073.html foo bar && python download.py 500 ~/Desktop/the_best_of_piano

Explain:
--------
More information at http://dethoima.com
