## AI tools for producing matches

Generators are data pipeline for image and text processing, that index complex features in such a way that nearest neighbors can easily be fetched. Matches are nearest neighbors. Generators can be combined to create complex features. The exact same list of generators should be used at indexing and searching times.

The list of supported generators is available from `generators.py`.

#### Indexing a set of images

```
python recog_index.py --input-imgs /path/to/imgs/ --indexes-repo /path/to/tate/data/indexes/ --models-repo /path/to/tate/data/models --generators composition_1 places
```

This produces a series of indexes into `/path/to/tate/data/indexes`. Here the two generators used are `composition_1` and `places`.

#### Getting matches for a set of images

```
python recog_matches.py --input-imgs ~/projects/tate/data/test/small_imgs/ --indexes-repo ~/projects/tate/data/test/indexes/ --models-repo /home/beniz/projects/tate/data/models/ --generators composition_1 places
```

This yields a JSON output readily usable by the UI part.