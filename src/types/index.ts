import { Request } from 'express'

export interface Reading {
  timestamp: number | string
  name: string
  value: number
}

export interface ReadingsRequest extends Request {
  readings: Reading[] | []
}
