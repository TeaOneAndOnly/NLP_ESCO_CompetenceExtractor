import express from 'express'
import sessionDAO from '../models/Session/sessionDAO'
import SessionModel from '../models/Session/SessionModel'
import userDAO from '../models/User/userDAO'
import nodemailer from 'nodemailer'
import Crypt from 'cryptr'


import hasher, { salt } from '../services/Hasher'

const encrypter = new Crypt('secret')

const transporter = nodemailer.createTransport(
    {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT ? process.env.EMAIL_PORT : '587'),
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    }


)


let expireTime = 60 * 60 * 1000
class AuthCtrl {

    signIn: express.Handler = async (req, res, next) => {
        try {

            const availableCookie = req.cookies['session_cookie']
            if (availableCookie) await sessionDAO.deleteById(availableCookie)
            const { email, password } = req.body
            if (!email || !password) return res.status(401).json({ message: 'Username and password has to be provided' })

            const user = await userDAO.findById(email)
            if (!user)  next({message: 'Invalid username or password!', status: 401}) 

            console.log(password, user.password)


            if (!hasher.compareSync(password, user.password))
                return res.status(401).json({ message: 'Invalid username or password!' })


            const now = new Date()

            let session = new SessionModel({ userId: user._id, expiresAt: new Date(now.valueOf() + expireTime) })
            await sessionDAO.insert(session)
            res.cookie('session_cookie', session._id)
            return res.end()
        } catch (err) {
            console.log({ err })
            return next(err)
        }

    }

    refreshSession: express.Handler = async (req, res, next) => {
        try {
            const availableCookie = req.cookies['session_cookie']
            let session = await sessionDAO.findById(availableCookie)
            if (session) {
                const now = new Date()
                session.expiresAt = new Date(now.valueOf() + expireTime)
                await sessionDAO.updateById(session._id, session)
            }
            return res.end()
        } catch (err) {
            return next(err)
        }
    }

    signOut: express.Handler = async (req, res, next) => {
        try {
            const availableCookie = req.cookies['session_cookie']
            if (availableCookie) {
                await sessionDAO.deleteById(availableCookie)
                res.clearCookie('session_cookie')
            }
            return res.end()
        } catch (err) {
            return next(err)
        }
    }

    requireUserAuth: (opts?: { requireAdmin: boolean }) =>
        express.Handler = (opts = { requireAdmin: false }) => {
            return async (req, res, next) => {
                try {
                    const availableCookie = req.cookies['session_cookie']
                    const session = await sessionDAO.findById(availableCookie)
                    if (!session || session.expiresAt < new Date())
                        return res.status(401).json({ message: 'Invalid session or session token expired!' })

                    res.locals.user = await userDAO.findById(session.userId)

                    if (opts.requireAdmin && !res.locals.user.isAdmin)
                        return res.status(403).json({ message: 'You need to be admin user to access this route' })

                    return next()
                } catch (err) {
                    return next(err)
                }
            }
        }


    register: express.Handler = async (req, res, next) => {
        try {
            const { email, firstName, lastName, password } = req.body;

            const user = await userDAO.findById(email);
            if (user) next({ message: 'User with that email already exist', status: 400 })


            const hash = hasher.hashSync(password, salt)

            await userDAO.insert({
                _id: email, isVerified: false, firstName, lastName,
                password: hash

            })

            const encryptedMail = encrypter.encrypt(email)

            transporter.sendMail({
                from: "the-anh.nguyen@outlook.de",
                to: email,
                html: `<a href='http://localhost:3000/verify/${encryptedMail}'>Click me to verfiy registration</a>`
            })


            return res.json({ message: 'Email instruction send to the email' })



        } catch (err) {
            console.log({ err })
            next(err)
        }


    }

    verfiy: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const decryptedEmail = encrypter.decrypt(id)
            const user = await userDAO.findById(decryptedEmail);
            user.isVerified = true;
            await userDAO.updateById(user._id, user);
            return res.json({ message: 'User successfully registered', });
        } catch (err) {
            next(err)
        }
    }

}

const ctrl = new AuthCtrl()

export default ctrl;