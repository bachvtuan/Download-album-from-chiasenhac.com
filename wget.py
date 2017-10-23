import sys,json,os
#casperjs --disk-cache=true collect.js {1} {2} {3} && python wget.py {4} && wget -i list.txt -P {5}    
if __name__ == '__main__':

  if len(sys.argv) != 2:
    
    print "wrong argv python wget.py quality(32,128,320,500,lossless)"
    sys.exit()

  quality = sys.argv[1]
  # folder = sys.argv[2]

  assert quality in ['32','128','320','500','lossless']
  
  mapping = {
    '32' : {
      'full': '32kbps',
      'find' : ' [M4A 32kbps]'
    },
    '128' : {
      'full': '128kbps',
      'find' : ' [MP3 128kbps]'
    },
    '320' : {
      'full': '320kbps',
      'find' : ' [MP3 320kbps]'
    },
    '500' : {
      'full': '500kbps',
      'find' : ' [M4A 500kbps]'
    },
    'lossless' : {
      'full': 'Lossless',
      'find' : ' [FLAC Lossless]'
    },
  }

  file = open('data.txt', 'r')
  files = json.loads(file.read())
  
  map_item  = mapping[quality]

  list_files = files[ map_item['full'] ]

  output = open("list.txt", "w")
    #Write request content to file
  list_lines = ""
  for item in list_files:
    list_lines += item +"\n"

  output.write(list_lines)

  output.close()