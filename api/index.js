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

app.get('/get-goons', async (req, res) => {
  const goonsdetails = await prisma.goonsdetail.findMany({})
  res.json(goonsdetails)
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
