import type { NextPage, GetStaticProps } from 'next'
import { StoragePlan, PlanNames } from 'types/storagePlans'
import { getPlans } from 'services/storagePlans'
import Head from 'next/head'
import Layout from 'components/Layout'
import StoragePlans from 'components/StoragePlans'

type HomeProps = {
  plans: StoragePlan[]
}

const Home: NextPage<HomeProps> = ({ plans }) => {
  return (
    <>
      <Head>
        <title>Makespace Storage Plans</title>
      </Head>

      <Layout>
        <StoragePlans plans={plans} />
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
