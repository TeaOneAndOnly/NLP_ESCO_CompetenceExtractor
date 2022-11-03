# import spacy
# from spacy import displacy
# nlp = spacy.load("de_core_news_sm")

import pandas as pd 
import requests

from pathlib import Path  


occupationDf = pd.read_csv('occPillar.csv')
skillSkillRelations = pd.read_csv('skillPillar.csv')

occupationDf = occupationDf.drop_duplicates(subset=['conceptUri'])
skillDf = skillSkillRelations.drop_duplicates(subset=['conceptUri'])

occupationDf = occupationDf.loc[occupationDf['conceptType'] == 'Occupation'].reset_index()
skillDf = skillDf.loc[skillDf['conceptType'] == 'KnowledgeSkillCompetence'].reset_index()


esco_url = 'http://localhost:8080'

map = dict()

occupationUriTupple = list()
skillUriTupple = list()
import time

start = time.time()

counterOcc= 0
skillCounter = 0

for index,row in occupationDf.iterrows():
    if index % 100 == 0 and index != 0:
        counterOcc += 100
        print('occ: ',counterOcc)


    occupationUriTupple.append([row['conceptUri'],
    requests.get(f'{esco_url}/resource/occupation?uri={row.conceptUri}').json()['title']
     ])


occFilePath = Path('occTupple.csv')  
occCSV = pd.DataFrame(occupationUriTupple, columns=['uri', 'title'])
occCSV.to_csv(occFilePath)

for index,row in skillDf.iterrows():
    if index % 100 == 0 and index != 0:
        skillCounter += 100
        print('skill: ',skillCounter)


    skillUriTupple.append([row['conceptUri'],
    requests.get(f'{esco_url}/resource/skill?uri={row.conceptUri}').json()['title']
     ])


end = time.time()


skillCSV = pd.DataFrame(occupationUriTupple, columns=['uri', 'title'])

skillFilePath = Path('skillTupple.csv')  

skillCSV.to_csv(skillFilePath)