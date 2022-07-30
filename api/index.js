import express from 'express'
import { PrismaClient } from '@prisma/client'
import { isLocationValid, parsedLocation } from '../helpers/validate'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

export default {
  path: '/api',
  handler: app
}

app.post(`/user`, async (req, res) => {
    const result = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        ip: req.socket.remoteAddress
      },
    })
    res.json(result)
})

app.post(`/add-goons`, async (req, res) => {
    const theLocation = parsedLocation(req.body.location)
    if(isLocationValid(theLocation)) {
        throw new Error('WRONG LOCATION')
    } else {

    }
    const result = await prisma.goonsdetail.create({
        data: {
            location: theLocation,
            time: new Date(req.body.time),
            ipAddress: req.socket.remoteAddress
        },
    })
    console.log(result)
    res.json(result)
})
