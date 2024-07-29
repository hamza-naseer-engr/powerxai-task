import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { ReadingsValidator } from './middlewares/validators/readings.validator'
import { FetchData, UpsertData } from './controller.ts/data.controller'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Express = express()

app.use(helmet())
app.use(express.text())

app.post('/data', ReadingsValidator as any, UpsertData as any)

app.get('/data', FetchData)

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`))
