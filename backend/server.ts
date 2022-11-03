import userDAO from './express/models/User/userDAO'
import UserModel from './express/models/User/UserModel'
import express from 'express'
import authCtrl from './express/controllers/authCtrl'
import cookieParser from 'cookie-parser'
import userCtrl from './express/controllers/userCtrl'
import postingCtrl from './express/controllers/postingCtrl'
import SkillDAO from './express/models/Skill/SkillDAO'
import SkillModel from './express/models/Skill/SkillModel'
const csv = require('csvtojson')
const next = require('next')

const port = parseInt(process.env.PORT!, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(async () => {
  const server = express()

  const [allUsers, allSkills] = await Promise.all([userDAO.findAll(), SkillDAO.findAll()])

  if (!allUsers.find((user) => user._id === 'ADMIN'))
    userDAO.insert({ username: 'ADMIN', password: '12345', isAdmin: true, _id: 'ADMIN', isVerified: true })

  if (!allUsers.find((user) => user._id === 'USER'))
    userDAO.insert({ username: 'USER', password: '12345', isAdmin: false, _id: 'USER', isVerified: true })

  if (allSkills.length === 0) {
    let arr: any[] = await csv()
      .fromFile('../preprocessor/skillMapping2.csv')

    let skillPromises: Promise<SkillModel>[] = []
    for (const obj of arr) {
      skillPromises.push(
        SkillDAO.insert(
          new SkillModel({ _id: obj.uri as string, label: obj.title }))
      )
    }
    await Promise.all([skillPromises])
  }


  server.use(express.json())
  server.use(cookieParser())

  server.post('/signIn', authCtrl.signIn)


  server.post('/register', authCtrl.register)
  server.get('/verify/:id', authCtrl.verfiy)


  server.get('/users/myself', authCtrl.requireUserAuth(), userCtrl.getUserInformation)
  server.post('/refreshSession', authCtrl.refreshSession)
  server.post('/signOut', authCtrl.signOut)

  server.get('/postings', postingCtrl.getAllPostings)
  server.post('/postings', postingCtrl.insertPosting)
  server.delete('/postings/:id', postingCtrl.deletePosting)



  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.use(((err, req, res, next) => {
    console.log(err)
    return res.status(err.status || 500).json({ message: err?.message || err })
  }) as express.ErrorRequestHandler)



  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
