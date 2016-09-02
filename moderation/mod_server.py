import argparse, json, sys
from threading import Lock
from flask import Flask
from flask import request
app = Flask(__name__)

glob_json_file = ''
glob_jdata = {}

lock = Lock()

# in JSON lookup
def lookup(img_in,img_out):
    for m in glob_jdata:
        #print m
        
        if m['input']['img'] == img_in:
            for mo in m['output']:
                if mo['img'] == img_out:
                    return m['status']
            print 'Cannot find',img_out,'in',img_in,'matches'
            return ''

# change JSON data
def change_status(img_in,img_out,status):
    for m in glob_jdata:
        if m['input']['img'] == img_in:
            for mo in m['output']:
                if mo['img'] == img_out:
                    m['status'] = status
                    print 'img_in=',img_in,' / img_out=',img_out,' / status changed to',m['status']
                    return m['status']
            print 'Cannot find',img_out,'in',img_in,'matches'
            return ''

# save and reload JSON file
def save_status():
    with open(glob_json_file,'w+') as fout:
        json.dump(glob_jdata,fout)
    
@app.route('/moderation',methods=['GET'])
def get_moderate():
    img_in = request.args.get('img_in')
    img_out = request.args.get('img_out')
    with lock:
        mod = lookup(img_in,img_out)
    if mod:
        return mod
    else:
        return 'Not Found'
    
@app.route('/moderation',methods=['POST'])
def post_moderate():
    img_in = request.get_json()['img_in']
    img_out = request.get_json()['img_out']
    mod = request.get_json()['status']
    with lock:
        change = change_status(img_in,img_out,mod)
        save_status()
    if change == mod:
        return '200 OK'
    else:
        return '404 Not Found'

if __name__ == "__main__":
    
    parser = argparse.ArgumentParser()
    parser.add_argument('--json-file',help='path to matches in JSON file')
    args = parser.parse_args()

    # load JSON file up
    with open(args.json_file,'r') as fin:
        glob_jdata = json.load(fin)
        glob_json_file = args.json_file
    
    app.run()
