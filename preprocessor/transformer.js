const csv = require('csvtojson')
const axios = require('axios')
const occFilePath = './occPillar.csv'
const skillFilePath = './skillPillar.csv'
const Promise = require('bluebird')
const escoUrl = 'http://localhost:8080'
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './occMapping.csv',
    header: [
        { id: 'uri', title: 'uri' },
        { id: 'title', title: 'title' }
    ]
});

const csvWriter2 = createCsvWriter({
    path: './skillMapping2.csv',
    header: [
        { id: 'uri', title: 'uri' },
        { id: 'title', title: 'title' },
        { id: 'alternativeLabels', title: 'alternativeLabels' }
    ]
});
console.time("seconds");


async function main() {
    try {
        const csv = require('csvtojson')
        const occObjs = (await csv().fromFile(occFilePath))
            .filter((item) => item.conceptType === 'Occupation')

        let map = {}
        const skillObjs = (await csv().fromFile(skillFilePath))
            .filter((item) => {
                if (map[item.conceptUri]) {
                    return false
                } else {
                    map[item.conceptUri] = true
                    if (item.conceptType === 'KnowledgeSkillCompetence') return true
                    return false
                }
            })

        // const occValues = await Promise.map(occObjs, (item) => {
        //     return axios.get(`${escoUrl}/resource/occupation?uri=${item.conceptUri}`).then(({ data }) => ({ title: data.title }))
        // },
        //     { concurrency: 10 }
        // )

        // for (let i = 0; i < occValues.length; i++) {
        //     occValues[i]['uri'] = occObjs[i].conceptUri
        // }

        // console.timeLog('seconds')
        // await csvWriter.writeRecords(occValues)



        const skillValues = await Promise.map(skillObjs, (item, index) => {
            return axios.get(`${escoUrl}/resource/skill?uri=${item.conceptUri}`).then(({ data }) => {
                return ({ uri: skillObjs[index].conceptUri, title: data.title, alternativeLabels: data.alternativeLabel?.en?.join('|') || '' })
            })
        },
            { concurrency: 10 }
        )

        console.log({ skillValues })

        // console.log()

        // for (let i = 0; i < skillValues.length; i++) {
        //     skillValues[i]['uri'] = skillObjs[i].conceptUri
        // }

        console.timeLog('seconds')


        await csvWriter2.writeRecords(skillValues)

        console.log('END:')
        console.timeLog('seconds')


    } catch (err) {
        console.log(err)
    }


}

main();