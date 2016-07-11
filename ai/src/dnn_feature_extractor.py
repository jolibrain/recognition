# Deep Neural Network feature extractor, using DeepDetect

import os, sys
from feature_generator import FeatureGenerator
from index_search import Indexer, Searcher
from dd_client import DD

import logging
logging.basicConfig()
logger = logging.getLogger(__name__)

##TODO: may move to a tools.py 
def batch(iterable, n=1):
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]

# class to define a dd DNN model
class DNNModel:

    def __init__(self,name,model_repo,nclasses,extract_layer='',best=5,
                 img_width=224,img_height=224,description=''):
        self.name = name
        self.description = description
        self.extract_layer = extract_layer
        self.best = best
        self.nclasses = nclasses
        self.img_width = img_width
        self.img_height = img_height
        self.model_repo = model_repo

# a feature extractor for images, from a configurable layer of a pre-trained deep neural (convolutional) net        
class DNNFeatureExtractor(FeatureGenerator):

    def __init__(self,dnnmodel,image_files,index_repo,
                 batch_size=32,dd_host='localhost',dd_port=8080,dd_description='image classification'):
        self.dd_host = dd_host
        self.dd_port = dd_port
        self.dd_description = dd_description
        self.dd_mllib = 'caffe'
        self.dnnmodel = dnnmodel
        if self.dnnmodel.extract_layer:
            self.dd_mltype = 'unsupervised'
        else:
            self.dd_mltype = 'supervised'
        self.image_files = image_files
        self.batch_size = batch_size
        self.binarized = False
        self.dd = DD(self.dd_host,self.dd_port)
        self.dd.set_return_format(self.dd.RETURN_PYTHON)
        self.index_repo = index_repo + '/' + self.dnnmodel.name
        try:
            os.mkdir(self.index_repo)
        except:
            logger.warning('directory ' + self.index_repo + ' may alreay exist')
            
    def create_dd_service(self):
        model = {'repository':self.dnnmodel.model_repo}
        parameters_input = {'connector':'image','width':self.dnnmodel.img_width,'height':self.dnnmodel.img_height}
        parameters_mllib = {'nclasses':self.dnnmodel.nclasses}
        parameters_output = {}
        screate = self.dd.put_service(self.dnnmodel.name,model,self.dd_description,self.dd_mllib,
                                      parameters_input,parameters_mllib,parameters_output,self.dd_mltype)
        print 'dd service create output=',screate
        outcode = screate['status']['code']
        if outcode != 201 and outcode != 403:
            print 'error'
            logger.error('failed creation of DNN service ' + self.dnnmodel.name)
            sys.exit()
        return

    def delete_dd_service(self):
        self.dd.delete_service(self.dnnmodel.name,clear='')
        
    def preproc(self):
        #TODO
        return

    def index(self):
        ## feature generation, to be indexed or searched for
        self.create_dd_service()
        feature_vectors = []
        uris = []
        parameters_input = {}
        parameters_mllib = {'gpu':True,'extract_layer':self.dnnmodel.extract_layer}

        if self.dd_mltype == 'unsupervised':
            parameters_output = {'binarized':self.binarized}
            # pass one image to get the size of the output layer
            classif = self.dd.post_predict(self.dnnmodel.name,[self.image_files[0]],
                                           parameters_input,parameters_mllib,parameters_output)
            ##TODO: error checking
            dim = len(classif['body']['predictions']['vals'])
        else:
            parameters_output = {'best':self.dnnmodel.best}
            dim = self.dnnmodel.nclasses
            
        c = 0
        logger.info('dnn feature prediction and indexing')
        with Indexer(dim,self.index_repo) as indexer:
            for x in batch(self.image_files,self.batch_size):
                classif = self.dd.post_predict(self.dnnmodel.name,x,
                                               parameters_input,parameters_mllib,parameters_output)
                ##TODO: error checking
                predictions = classif['body']['predictions']
                print 'predictions=',predictions
                for p in classif['body']['predictions']:
                    if self.dd_mltype == 'unsupervised':
                        indexer.index_single(c,p['vals'],p['uri'])
                        c = c + 1
                        if c % self.batch_size == 0:
                            logger.info('indexed ' + str(c) + ' images')
                    else: ##TODO: index_tags ?
                        indexer.index_tags_single(p['classes'],p['uri'])
                            
            indexer.build_index()
            indexer.save_index()
        logger.info('indexed a total of ' + str(c) + ' images')
        self.delete_dd_service()
                    
    def search(self,jdataout={}):
        self.create_dd_service()
        parameters_input = {}
        parameters_mllib = {'gpu':True,'extract_layer':self.dnnmodel.extract_layer}

        if self.dd_mltype == 'unsupervised':
            parameters_output = {'binarized':self.binarized}
        else:
            parameters_output = {'best':self.dnnmodel.best}

        results = {}
        with Searcher(self.index_repo) as searcher:
            searcher.load_index()
            for x in batch(self.image_files,self.batch_size):
                classif = self.dd.post_predict(self.dnnmodel.name,x,
                                               parameters_input,parameters_mllib,parameters_output)
                #print 'classif=',classif
                ##TODO: error checking
                predictions = classif['body']['predictions']
                for p in predictions:
                    if self.dd_mltype == 'unsupervised':
                        nns = searcher.search_single(p['vals'],p['uri'])
                    else:
                        nns = searcher.search_tags_single(p['classes'],p['uri'])
                    results[p['uri']] = nns

        self.delete_dd_service()
        return self.to_json(results,'/img/reuters/','/img/tate/',self.dnnmodel.name,self.dnnmodel.description,jdataout)
