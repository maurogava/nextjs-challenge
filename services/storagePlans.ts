import csv from 'csvtojson'
import path from 'path'
import { PlanNames, RawStoragePlan, StoragePlan } from 'types/storagePlans'

// This data is mocked but it should come from DB in a real life project
const planDescriptions = {
  [PlanNames.sm]:
    "Ten square feet is nothing to scoff at! Store your off-season shoes, finished books, or cool toys you're saving for that future kid in your life.",
  [PlanNames.md]:
    "You can fit an entire small room in here. Are you moving apartments? Or maybe you have 3-5 bicycles you just can't bring yourself to sell.",
  [PlanNames.lg]:
    'Are you renovating your living room? This is a great plan for the home renovator who needs a place to store things while a room is gutted and re-made.',
  [PlanNames.xl]:
    'Moving from a large home? Throw it all in here! Take your time buying and moving into your next home knowing that all of your possessions are safe and sound.',
}

const adapter = (
  storagePlan: RawStoragePlan,
  withDescription: boolean = true
): StoragePlan => {
  const { plan, name } = storagePlan
  const description = withDescription && planDescriptions[plan]

  return {
    plan,
    name,
    basePrice: Number(storagePlan['base price']),
    // Will add the description only if it exists
    ...(description && { description }),
  }
}

export const getPlans = async (): Promise<StoragePlan[] | null> => {
  let res = null

  try {
    // This data is retrieved from the csv files but it should come from DB in a real life project
    const filePath = path.join(process.cwd(), 'data/storage_plans.csv')
    const tempRes: RawStoragePlan[] = await csv().fromFile(filePath)
    res = tempRes.map((plan) => adapter(plan))
  } catch (err) {
    console.log(err)
  }

  return res
}

export const getPlan = async (
  storagePlan: PlanNames
): Promise<StoragePlan | null> => {
  try {
    // This data is retrieved from the csv files but it should come from DB in a real life project
    const filePath = path.join(process.cwd(), 'data/storage_plans.csv')
    const tempRes: RawStoragePlan[] = await csv().fromFile(filePath)
    const plan = tempRes.find(({ plan }) => storagePlan === plan)

    if (plan) {
      return adapter(plan, false)
    }
  } catch (err) {
    console.log(err)
  }

  return null
}
