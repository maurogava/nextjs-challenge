import type { NextPage, GetStaticProps } from 'next'
import { StoragePlan, PlanNames } from 'types/storagePlans'
import { getPlans } from 'services/storagePlans'
import Head from 'next/head'
import Layout from 'components/Layout'
import Card from 'components/Card'

const Home: NextPage<{ plans: StoragePlan[] }> = ({ plans }) => {
  return (
    <>
      <Head>
        <title>Makespace Storage Plans</title>
        <meta
          name="description"
          content="We'll move it, store it, and bring it back when you need it—full-service storage at an affordable price."
        />
      </Head>

      <Layout>
        <h1>Select a Storage Plan</h1>
        {plans.map((plan) => (
          <Card key={plan.plan} plan={plan}></Card>
        ))}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const plans = await getPlans()

  return {
    props: { plans },
    notFound: false,
  }
}

export default Home
