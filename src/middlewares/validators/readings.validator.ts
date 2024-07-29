import { Response, NextFunction } from 'express'
import { Reading, ReadingsRequest } from '../../types'

export const ReadingsValidator = (
  req: ReadingsRequest,
  res: Response,
  next: NextFunction
) => {
  const data: string = req.body
  const lines = data.trim().split('\n')

  const parsedReadings: Reading[] = []
  const regex = /^(\d+) (\w+) (\d+(\.\d+)?)$/

  for (const line of lines) {
    const match = line.match(regex)
    if (match) {
      const [, timestamp, name, value] = match

      parsedReadings.push({
        timestamp: parseInt(timestamp, 10),
        name,
        value: parseFloat(value),
      })
    } else {
      return res.json({ success: false })
    }
  }

  if (!parsedReadings) {
    return res.json({ success: false })
  }

  req.readings = parsedReadings
  next()
}
