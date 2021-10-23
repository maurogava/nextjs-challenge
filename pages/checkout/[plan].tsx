import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { StoragePlan, PlanNames } from 'types/storagePlans'
import { getPlans, getPlan } from 'services/storagePlans'
import Layout from 'components/Layout'
import { FormContextProvider } from 'components/checkout/useCheckoutForm'
import CheckoutForm from 'components/checkout/CheckoutForm'
import PurchaseDetails from 'components/checkout/PurchaseDetails'

import styles from './Plan.module.scss'

type PlanCheckoutProps = {
  plan: StoragePlan
}

const PlanCheckout: NextPage<PlanCheckoutProps> = ({ plan }) => {
  return (
    <>
      <Head>
        <title>Checkout Storage Plans</title>
      </Head>
      <FormContextProvider>
        <Layout>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Checkout</h1>
            <CheckoutForm />
            <PurchaseDetails plan={plan} />
          </div>
        </Layout>
      </FormContextProvider>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const plans = (await getPlans()) ?? []

  const paths = plans.map(({ plan }) => ({
    params: { plan },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const planSlug = params?.plan as PlanNames
  const storagePlan = await getPlan(planSlug)

  return {
    props: { plan: storagePlan },
    notFound: false,
  }
}

export default PlanCheckout
