import sys, argparse, json

parser = argparse.ArgumentParser()
parser.add_argument('--file1',help='input match file')
parser.add_argument('--file2',help='additional match file')
parser.add_argument('--outfile',help='output file')
args = parser.parse_args()

def concat(filein,fileout,maxm=-1):
    json_in = {}
    json_out = {}
    try:
        with open(filein,'r') as fin:
            json_in = json.load(fin)
    except:
        logger.info('cannot load pre-existing JSON file=',filein)
    try:
        with open(fileout,'r') as fin:
            json_out = json.load(fin)
    except:
        logger.info('cannot load pre-existing JSON file=',fileout)
    n = 0
    for j in json_in:
        skip = False
        for ji in json_out:
            if ji['input']['img'] == j['input']['img']:
                skip = True
                break
        if not skip:
            json_out.append(j)
            n = n + 1
            if maxm != -1 and n > maxm:
                return
    with open(args.outfile,'w') as outf:
        json.dump(json_out,outf)

concat(args.file1,args.file2) # concats file2 at the top of file1 into file2
