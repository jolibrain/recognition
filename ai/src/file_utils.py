# tools for dealing with files, mostly images

from os import listdir
from os.path import isfile, join
from os import walk

def list_files(repository,ext='.jpg'):
    onlyfiles = []
    for (dirpath, dirnames, filenames) in walk(repository):
        nfilenames = []
        for f in filenames:
            if f.endswith(ext):
                nfilenames.append(dirpath +'/' + f)
        if nfilenames:
            onlyfiles.extend(nfilenames)
    return onlyfiles
