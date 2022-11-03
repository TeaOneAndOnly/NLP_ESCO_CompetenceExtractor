import pandas as pd
from CompetenceExtractor import CompetenceExtractor
import pickle 
import time
import sys
import json

filehandler = open('competenceExtractorMap.obj', 'wb') 
competenceExtractor = CompetenceExtractor()
start = time.time()
print("Counting compilation time:")


skillDf = pd.read_csv('./preprocessor/skillMapping2.csv')

for index,row in skillDf.iterrows():
    for label in str(row.alternativeLabels).split('|'):
        try:
            if(label != '' and len(label.split()) > 1):
                competenceExtractor.insert(label,row.uri)
        except:
            print(type(label))
            print(sys.exc_info()[0])
            print(index,label)
    competenceExtractor.insert(row.title,row.uri)
    if index % 1000 == 0:
        print(index)
    

pickle.dump(competenceExtractor.map, filehandler)
filehandler.close()

with open("competenceExtractorMap.json", "w") as outfile:
    json.dump(competenceExtractor.map, outfile)

end = time.time()
print(end - start)
