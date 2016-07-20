# Simple ensembling of similarity scores

class EnsemblingScores:
    def __init__(self):
        return

    # json_out in UI format, simple additive ensembling
    def ensembling(self,json_out):
        for k,m in json_out.iteritems(): # iterate matches
            for o in m['output']: # iterate candidates for a given match
                final_score = 0.0
                for g,v in o['features']['out'].iteritems(): # iterate generators of a match
                    final_score += v['score']
                o['features']['score'] = final_score
        return json_out
