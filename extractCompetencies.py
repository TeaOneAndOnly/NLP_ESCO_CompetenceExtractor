import pickle 
from CompetenceExtractor import CompetenceExtractor
from argparse import ArgumentParser
import json 

filehandler = open('competenceExtractorMap.obj', 'rb') 
dic: dict = pickle.load(filehandler)
competenceExtractor = CompetenceExtractor()
competenceExtractor.map = dic 


#### parse command line arguments


parser = ArgumentParser()
parser.add_argument('--input', '-i')
parser.add_argument('--file', '-f')



args = parser.parse_args()

if args.file:
    file = open(args.file, 'r')
    print(json.dumps(competenceExtractor.findCompetencesInText(file.read())))
elif args.input:
    print(json.dumps(competenceExtractor.findCompetencesInText(args.input)))


