generator_lk = {
    'composition_1': {
        'name':'googlenet',
        'nclasses': 1000,
        'extract_layer':'loss3/classifier',
        'description':'general composition'
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
