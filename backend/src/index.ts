import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'

const validCredentials = {
  username: 'admin',
  password: '', //'LoveKitties',
}

const jwtSecret = 'luv cats 4 ever'
const exJwt = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
})

const app = express()

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())

app.post(`/login`, (req: express.Request, res: express.Response) => {
  const { username, password } = req.body

  if (username === validCredentials.username && password === validCredentials.password) {
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: 129600 })
    res.status(200).json({ token, username, error: null })
  } else {
    res.status(401).json({ error: 'Credentials are invalid' })
  }
})

app.get(`/me`, exJwt, (req: express.Request, res: express.Response) => {
  res.status(200).json({ authenticated: true })
})

// Default response for any other request
app.use(function (req, res) {
  res.status(404)
})

app.listen(4000, function () {
  console.log('App listening on port 4000!')
})
