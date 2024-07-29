import { Request, Response } from 'express'
import { ReadingsRequest } from '../types'
import {
  addReading,
  calculatePower,
  getReadingsByDateRange,
} from '../services/dataManipulation.service'

export const UpsertData = (req: ReadingsRequest, res: Response) => {
  req.readings.forEach((reading) => addReading(reading))

  return res.json({ success: true })
}

export const FetchData = (req: Request, res: Response) => {
  const { from, to } = req.query

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing date range parameters' })
  }

  const startDate = new Date(from as string)
  const endDate = new Date(to as string)

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({ error: 'Invalid date format' })
  }

  const data = getReadingsByDateRange(startDate, endDate)
  const dataWithPower = calculatePower(data)

  return res.json(dataWithPower)
}
