import type { NextApiRequest, NextApiResponse } from 'next'
import { StoragePlan, PlanNames } from 'types/storagePlans'
import { getPlan } from 'services/storagePlans'

interface RawPriceFactor {
  'price factor': string
  'zip code': string
}

type Req = {
  storagePlan: PlanNames
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoragePlan>
) {
  const { storagePlan } = req.query as Req

  if (!storagePlan) {
    return res.status(400).end('The storage plan is not set')
  }

  const response = await getPlan(storagePlan)

  if (!response) {
    return res.status(400).end('Storage plan not found')
  }

  return res.status(200).json(response)
}
