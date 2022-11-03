import express from 'express'
import jobDAO from '../models/Posting/jobPostingDAO'
import JobModel from '../models/Posting/JobPostingModel'

class JobCtrl {

    getJobPostings: express.Handler = async (req, res, next) => {
        try {
            return res.json(await jobDAO.findAll())
        } catch (err) {
            return next(err)
        }
    }

    insertJobPostings: express.Handler = async (req, res, next) => {
        try {
            const { title, description } = req.body
            if (!title || !description) return res.status(400).json({ message: 'Title and description have to be present' })
            const doc = new JobModel({ title, description })
            await jobDAO.insert(doc)
            return res.json(doc)
        } catch (err) {
            return next(err)
        }
    }

    getUserInformation: express.Handler = async (req, res, next) => {
        try {
            const user =res.locals.user
            return res.json(user)
        } catch (err) {
            next(err)
        }
    }

}

const ctrl = new JobCtrl()

export default ctrl
