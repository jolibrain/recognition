## AI tools for producing matches

Generators are data pipeline for image and text processing, that index complex features in such a way that nearest neighbors can easily be fetched. Matches are nearest neighbors. Generators can be combined to create complex features. The exact same list of generators should be used at indexing and searching times.

The list of supported generators is available from `generators.py`.

#### Indexing a set of images

```
python recog_index.py --input-imgs /path/to/imgs/ --indexes-repo /path/to/tate/data/indexes/ --models-repo /path/to/tate/data/models --generators all
```

This produces a series of indexes into `/path/to/tate/data/indexes`. Here the two generators used are `composition_1` and `places`.

#### Getting matches for a set of images

```
python recog_matches.py --input-imgs /path/to/imgs/ --indexes-repo /path/to/tate/data/indexes/ --models-repo /path/to/tate/data/models/ --generators all
```

This yields a JSON output readily usable by the UI part.

### Requirements

Packages to be installed.

```
sudo pip install annoy
sudo aptitude install cython
sudo pip install word2vec
sudo pip install unidecode
sudo pip install nltk
```

For `nltk`, the following is needed in a Python interpreter:
```
import nltk
nltk.download("stopwords")
```

Word2vec needs a fix in order to work properly, see https://github.com/nicholas-leonard/word2vec/issues/25#issuecomment-174262029

Then install DeepDetect from
https://github.com/beniz/deepdetect.git

Install custom densecap from 
https://github.com/beniz/densecap
Modify `recognition/ai/tools/generators.py to set the correct path to densecap

Install neuraltalk2 from
https://github.com/karpathy/neuraltalk2

