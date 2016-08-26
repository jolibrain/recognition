generator_lk = {
    'meta': {
        'type':'meta',
        'name':'meta',
        'description':'metadata acquisition'
    },
    'composition_high_1': {
        'type': 'dnn',
        'name':'googlenet',
        'nclasses': 1000,
        'extract_layer':'loss3/classifier',
        'description':'general composition',
        'batch_size': 256
        },
    'composition_low_1': {
        'type': 'dnn',
        'name':'googlenet',
        'nclasses': 1000,
        'extract_layer':'pool5/7x7_s1',
        'description':'general composition',
        'batch_size': 256
        },
    'categories_1': {
        'type': 'dnn',
        'name':'googlenet',
        'nclasses': 1000,
        'best':5,
        'description':'general categories',
        'batch_size': 256
        },
    'composition_high_2': {
        'type': 'dnn',
        'name':'resnet_152',
        'nclasses': 1000,
        'extract_layer':'fc1000',
        'description':'general composition',
        'batch_size':1
        },
#    'composition_low_2': {
#        'type': 'dnn',
#        'name':'resnet_152',
#        'nclasses': 1000,
#        'extract_layer':'res5c',
#        'description':'general composition',
#        'batch_size':8
#        },
    'categories_2': {
        'type': 'dnn',
        'name':'resnet_152',
        'nclasses': 1000,
        'best':5,
        'description':'general categories',
        'batch_size':1
        },
    'composition_high_3': {
        'type': 'dnn',
        'name':'vgg_16',
        'nclasses': 1000,
        'extract_layer':'fc8',
        'description':'general composition',
        'batch_size':64
        },
    'composition_low_3': {
        'type': 'dnn',
        'name':'vgg_16',
        'nclasses': 1000,
        'extract_layer':'fc6',
        'description':'general composition',
        'batch_size':64
        },
    'categories_3': {
        'type': 'dnn',
        'name':'vgg_16',
        'nclasses': 1000,
        'best':5,
        'description':'general categories',
        'batch_size':64
        },
    'places_composition': {
        'type': 'dnn',
        'name':'places',
        'nclasses': 205,
        'extract_layer':'loss3/classifier',
        'description':'place composition',
        'batch_size': 256
        },
    'places': {
        'type': 'dnn',
        'name':'places',
        'nclasses': 205,
        'best':5,
        'description':'places',
        'batch_size': 256
        },
    'textembed': {
        'type': 'w2v',
        'name': 'textembed',
        'file': 'GoogleNews-vectors-negative300.bin',
        'dim': 300,
        'description':'text similarity'
    },
    'densecap': {
        'type': 'densecap',
        'name': 'densecap',
        'description': 'object detection',
        'wdir':  '/home/recog/tate/apps/densecap/',
        'thpath': '/home/recog/tate/apps/torch/install/bin/th'
    },
    'mapi': {
        'type': 'mapi',
        'name': 'mapi',
        'description': 'vision'
    },
    'captions': {
        'type': 'captions',
        'name': 'captions',
        'description': 'captions',
        'nt2_dir': '/home/recog/tate/apps/neuraltalk2/',
        'thpath': '/home/recog/tate/apps/torch/install/bin/th'
    }
}
