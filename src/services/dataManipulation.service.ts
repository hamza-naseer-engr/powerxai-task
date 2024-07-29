import { database } from "../database";
import { Reading } from "../types";

export const addReading = (reading: Reading): Reading => {
  database.push(reading);
  return reading;
};

export const getReadingsByDateRange = (startDate: Date, endDate: Date): Reading[] => {
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setHours(23, 59, 59);

  return database.filter(reading => {
    const readingDate = new Date(reading.timestamp as number * 1000);
    return readingDate >= startDate && readingDate <= adjustedEndDate;
  });
};

export const calculatePower = (data: Reading[]) => {
  const readingsByDate: { [key: string]: { voltage: number[], current: number[] } } = {};

  data.forEach(reading => {
    const readingDate = new Date(reading.timestamp as number * 1000);
    const dateKey = readingDate.toISOString().split('T')[0];

    if (!readingsByDate[dateKey]) {
      readingsByDate[dateKey] = { voltage: [], current: [] };
    }

    if (reading.name === 'Voltage') {
      readingsByDate[dateKey].voltage.push(reading.value);
    } else if (reading.name === 'Current') {
      readingsByDate[dateKey].current.push(reading.value);
    }
  });

  const result: Reading[] = [];

  for (const [date, { voltage, current }] of Object.entries(readingsByDate)) {
    const avgVoltage = voltage.length ? voltage.reduce((a, b) => a + b) / voltage.length : 0;
    const avgCurrent = current.length ? current.reduce((a, b) => a + b) / current.length : 0;
    const power = (avgVoltage * avgCurrent).toFixed(2);

    result.push({
      timestamp: new Date(`${date}T00:00:00Z`).toISOString(),
      name: 'Power',
      value: parseFloat(power)
    });

    voltage.forEach(value => result.push({
      timestamp: new Date(`${date}T00:00:00Z`).toISOString(),
      name: 'Voltage',
      value
    }));

    current.forEach(value => result.push({
      timestamp: new Date(`${date}T00:00:00Z`).toISOString(),
      name: 'Current',
      value
    }));
  }

  return result;
};
