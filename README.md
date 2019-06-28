Download entire songs in  album from website chiasenhac.com
=================================================

This project allow you download whole songs in a album on website http://chiasenhac.com include lossess songs.

Current Working Version:
-----------------------

- CapserJS(1.1.3)
- Phantomjs(2.1.1)

How it work :
-------------
- You register an account at http://chiasenhac.com( Remember confirm if needed )
- Download phantomjs and casperjs, setup properly. You can check casperjs work by command "casperjs --version"
- Pick any alblum url at chiasenhac.com such as "https://chiasenhac.vn/nghe-album/An-All-Night-Dont-Sleep-Vol1~Y3NuX2FsYnVtfjIwMQ==.html"
-Install python 2.7 and install additional module "urllib2"
- Run command casperjs --disk-cache=true collect.js {1} && python download.py {2} {3} 
Explain:

 - {1}: album url such as https://chiasenhac.vn/nghe-album/An-All-Night-Dont-Sleep-Vol1~Y3NuX2FsYnVtfjIwMQ==.html
 - {2}: Audio quality (128,320,500)
 - {3} folder to save album
-  Wget method: you also can use wget to download the list by command 
    casperjs --disk-cache=true collect.js {1} && python wget.py {2} && wget -i list.txt -P {3}
  
##Example:
__Download with python__

    casperjs --disk-cache=true collect.js https://chiasenhac.vn/nghe-album/An-All-Night-Dont-Sleep-Vol1~Y3NuX2FsYnVtfjIwMQ==.html && python download.py 500 ~/Desktop/An-All-Night-Dont-Sleep/vol1

__Download with wget__

    casperjs --disk-cache=true collect.js https://chiasenhac.vn/nghe-album/An-All-Night-Dont-Sleep-Vol1~Y3NuX2FsYnVtfjIwMQ==.html && python wget.py 500 && wget -i list.txt -P ~/Desktop/An-All-Night-Dont-Sleep/vol1


Explain:
--------
More information at [De thoi ma](https://dethoima.cf/code-tai-toan-bo-bai-nhac-trong-album-website-chiasenhac-com/)

