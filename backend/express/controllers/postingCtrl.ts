import express from 'express'
import jobPostingDAO from '../models/Posting/jobPostingDAO'
import JobPostingModel from '../models/Posting/JobPostingModel'
import { exec } from 'child_process'
import relationDAO from '../models/Relation/relationDAO'
import RelationModel from '../models/Relation/RelationModel'
import SkillDAO from '../models/Skill/SkillDAO'
import fs from 'fs'


class PostingCtrl {

    getAllPostings: express.Handler = async (req, res, next) => {
        try {
            const [postings, skills, relations] = await Promise.all([jobPostingDAO.findAll(), SkillDAO.findAll(), relationDAO.findAll()])
            return res.json({ postings, skills, relations })
        } catch (err) {
            return next(err)
        }
    }

    insertPosting: express.Handler = async (req, res, next) => {
        try {
            const { description, title } = req.body
            if (!description || !title) return next({ message: 'Description and title have to be defined', status: 400 })

            const posting = await jobPostingDAO.insert(new JobPostingModel({ description, title }))

            const competencies = await extractCompetencies(description)
            let relationPromises: Promise<RelationModel>[] = []
            for (const competency in competencies) {
                relationPromises.push(
                    relationDAO.insert(
                        new RelationModel({ fromId: posting._id, toId: competency, fromType: 'posting', toType: 'skill' })))

            }
            await Promise.all([...relationPromises])

            return res.json(competencies)
        } catch (err) {
            return next(err)
        }
    }

    deletePosting: express.Handler = async (req, res, next) => {
        try {
            const doc = await jobPostingDAO.findById(req.params.id)
            if (!doc) return next({ message: 'no doc with that id found', status: 404 })

            let docHasRelations = (await relationDAO.findAll()).filter((relation) => relation.fromId === doc._id)
            let deletePromises = [jobPostingDAO.deleteById(doc._id),
            docHasRelations.map((relation) => relationDAO.deleteById(relation._id))]
            await Promise.all([deletePromises])
            return res.status(204).send()
        } catch (err) {
            return next(err)
        }
    }

}

const extractCompetencies = async (description: string): Promise<{ [key: string]: any }> => {
    return new Promise(async (resolve, reject) => {
        const fileName = `asjdiofjasidofj.tmp`
        const isWin = process.platform === "win32";
        fs.writeFileSync('../' + fileName, description)

        const unixExec = `cd .. && source env/bin/activate && python extractCompetencies.py -f ${fileName}`
        const winExec = `cd .. && env\\Scripts\\activate && python extractCompetencies.py -f ${fileName}`

        exec(isWin ? winExec : unixExec,
            (err, stdout, sterr) => {
                if (err) return reject(err)
                return resolve((JSON.parse(stdout)))
            })
    })
}



export default new PostingCtrl()