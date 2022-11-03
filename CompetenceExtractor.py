

import spacy
from spacy.lang.en.stop_words import STOP_WORDS
import pandas as pd

nlp = spacy.load("en_core_web_sm")
skillDf = pd.read_csv('./preprocessor/skillMapping.csv')


class CompetenceExtractor:
    map = {}
    
    def insert(self, term: str, uri: str):
        processedArr = self.processText(term, False)
        currentLevel = self.map
        for index,processed in enumerate(processedArr):
            lemma = processed[0]
            if currentLevel.get(lemma) == None:
                currentLevel[lemma] = { 'valueOf': None}
                if index == len(processedArr) - 1:
                    currentLevel[lemma]['valueOf'] = uri
            else:
                if index == len(processedArr) - 1:
                    currentLevel[lemma]['valueOf'] = uri

            currentLevel = currentLevel[lemma]
                
    def findCompetencesInText(self, description:str):
        processedArr = self.processText(description, True)
        currentLevel = self.map
        indexRanges = list()
        indexMatches = list([0])
        competencies = {}

        for index,processed in enumerate(processedArr):
            lemma = processed[0]
            if currentLevel.get(lemma):
                if currentLevel[lemma]['valueOf'] != None:
                    indexMatches.append(index)

                ## if lemma is found but end of the text append to index Ranges
                if len(indexMatches) > 1 and index == len(processedArr) -1:
                   indexRanges.append(indexMatches)
                
                currentLevel = currentLevel[lemma]
            else:
                currentLevel = self.map
                if len(indexMatches) > 1:
                    indexRanges.append(indexMatches)
                indexMatches = list([index + 1])
        
        for matches in indexRanges:
            startIndex = matches[0]
            endIndex = matches[len(matches)-1]
            lemmatizedCompetence = ''
            for index in range(startIndex, endIndex+1):
                lemma = processedArr[index][0]
                lemmatizedCompetence +=  lemma + ' ' 
        
            uri = self.getValueofEntry(lemmatizedCompetence.strip())
            row = skillDf[skillDf['uri'] == uri].iloc[0]
            # competencies[f'{row.title}'] = uri
            competencies[f'{uri}'] = row.title

        return competencies

    def processText(self, sentenceOrTerm: str, removeStopwords=True):
        doc = nlp(sentenceOrTerm)
        processedArr = []
        for originalTextIndex,token in enumerate(doc): 
            if removeStopwords:
                if token.is_stop == False and token.is_punct == False:
                    processedArr.append([token.lemma_.lower(), originalTextIndex, token])
            else:
                if token.is_punct == False:
                    processedArr.append([token.lemma_.lower(), originalTextIndex, token])

            
        return processedArr

    def getValueofEntry(self, term):
        words = term.split()
        currentLevel = self.map
        for index,word in enumerate(words):
            currentLevel = currentLevel.get(word)

            if currentLevel == None:
                raise Exception('no valueOf with term found', term)
            if index == len(words) -1 and currentLevel['valueOf']:
                return currentLevel['valueOf']


   



