import csv from 'csvtojson'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isZip } from 'utils/validation'

interface RawPriceFactor {
  'price factor': string
  'zip code': string
}

type Data =
  | {
      priceFactor: number
    }
  | { error: string }

type Req = {
  zip: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { zip } = req.query as Req

  if (!isZip(zip)) {
    return res.status(200).json({ error: 'Invalid Zip code' })
  }

  let response: RawPriceFactor[]

  try {
    // This data is retrieved from the csv files but it should come from DB
    const filePath = path.join(process.cwd(), 'data/price_adjustments.csv')
    response = await csv().fromFile(filePath)
  } catch (err) {
    console.log(err)
    return res.status(500).end('Internal server error')
  }

  const priceFactor = response.find((el) => zip === el['zip code'])

  if (!priceFactor) {
    return res.status(200).json({ error: 'Zip code not found' })
  }

  return res
    .status(200)
    .json({ priceFactor: Number(priceFactor['price factor']) })
}
