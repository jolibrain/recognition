# tools for dealing with files, mostly images

from os import listdir
from os.path import isfile, join
from os import walk

##TODO: add filtering by extension (e.g. .jpg, .txt, ...)
def list_images(repository):
    onlyfiles = []
    for (dirpath, dirnames, filenames) in walk(repository):
        nfilenames = []
        for f in filenames:
            nfilenames.append(dirpath +'/' + f)
        onlyfiles.extend(nfilenames)
    return onlyfiles
