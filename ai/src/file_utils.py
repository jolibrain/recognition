# tools for dealing with files, mostly images

from os import listdir
from os.path import isfile, join
from os import walk

def list_files(repository,ext='.jpg',nfiles=-1):
    onlyfiles = []
    for (dirpath, dirnames, filenames) in walk(repository):
        nfilenames = []
        for f in filenames:
            if f.endswith(ext) and not 'tga' in f and not 'TGA' in f:
                nfilenames.append(dirpath +'/' + f)
            if nfiles > 0 and len(nfilenames) >= nfiles:
                break
        if nfilenames:
            onlyfiles.extend(nfilenames)
    return onlyfiles
