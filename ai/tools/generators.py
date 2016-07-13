generator_lk = {
    'composition_high_1': {
        'name':'googlenet',
        'nclasses': 1000,
        'extract_layer':'loss3/classifier',
        'description':'general composition'
        },
    'composition_low_1': {
        'name':'googlenet',
        'nclasses': 1000,
        'extract_layer':'pool5/7x7_s1',
        'description':'general composition'
        },
    'categories_1': {
        'name':'googlenet',
        'nclasses': 1000,
        'best':5,
        'description':'general categories'
        },
    'composition_high_2': {
        'name':'resnet_152',
        'nclasses': 1000,
        'extract_layer':'fc1000',
        'description':'general composition',
        'batch_size':8
        },
    'composition_low_2': {
        'name':'resnet_152',
        'nclasses': 1000,
        'extract_layer':'res5c',
        'description':'general composition',
        'batch_size':8
        },
    'categories_2': {
        'name':'resnet_152',
        'nclasses': 1000,
        'best':5,
        'description':'general categories',
        'batch_size':8
        },
    'composition_high_3': {
        'name':'vgg_16',
        'nclasses': 1000,
        'extract_layer':'fc8',
        'description':'general composition'
        },
    'composition_low_3': {
        'name':'vgg_16',
        'nclasses': 1000,
        'extract_layer':'fc6',
        'description':'general composition'
        },
    'categories_3': {
        'name':'vgg_16',
        'nclasses': 1000,
        'best':5,
        'description':'general categories'
        },
    'places_composition': {
        'name':'places',
        'nclasses': 205,
        'extract_layer':'loss3/classifier',
        'description':'place composition'
        },
    'places': {
        'name':'places',
        'nclasses': 205,
        'best':5,
        'description':'places'
        }
}
