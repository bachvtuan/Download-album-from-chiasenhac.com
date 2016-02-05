import urllib2,sys,json,os

def chunk_report(bytes_so_far, total_size,mb_size):
  percent = float(bytes_so_far) / total_size
  percent = round(percent*100, 2)
  sys.stdout.write("Downloaded %d of %0.2f bytes (%.3f MB) (%0.2f%%)\r" % 
    (bytes_so_far, total_size, mb_size, percent))

  if bytes_so_far >= total_size:
    sys.stdout.write('\n')

def chunk_read(response, output, chunk_size=8192, report_hook=None):
  total_size = response.info().getheader('Content-Length').strip()
  total_size = int(total_size)
  mb_size = total_size/float(1024*1024)
  
  chunk_size = 256 * 10240
  
  bytes_so_far = 0
  
  while 1:
    chunk = response.read(chunk_size)
    bytes_so_far += len(chunk)

    if not chunk:
      break
    
    if report_hook:
      report_hook(bytes_so_far, total_size,mb_size)
  
    output.write(chunk)
  #return "".join(data)
  output.close()

if __name__ == '__main__':

  print sys.argv
  if len(sys.argv) != 3:
    print "wrong argv python download.py quality(32,128,320,500,lossless) folder_save"
    sys.exit()

  quality = sys.argv[1]
  folder = sys.argv[2]

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

  total_files = len(files[ map_item['full'] ])
  index = 1;

  #Create folder if folder doesn't exist
  if not os.path.exists(folder):
    os.makedirs(folder)

  for file_url in files[ map_item['full'] ]:
    file_name = os.path.basename(file_url)

    #1. First song.flac
    file_name =  str(index) + ". " + urllib2.unquote(file_name)

    #Remove uncessary string at the end of file
    file_name = file_name.replace( map_item['find'],"")
    
    file_name =  folder + "/" + file_name

    print "Downloading file_name {0}/{1} files ".format(index, total_files)

    #Get file content
    response = urllib2.urlopen(file_url.replace(" ","%20"))
    #Create file with write mode
    output = open(file_name, "wb")
    #Write request content to file
    #output.write(chunk_read(response, report_hook=chunk_report))
    #Close file
    #output.close()
    chunk_read(response,output, report_hook=chunk_report)
    #Close file
    #output.close()

    index += 1
    
  print "Download done, have fun :)"