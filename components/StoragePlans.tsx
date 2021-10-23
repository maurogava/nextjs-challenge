import { FC, ReactElement, CSSProperties } from 'react'
import { StoragePlan } from 'types/storagePlans'
import Card from 'components/Card'

import styles from './StoragePlans.module.scss'

type StoragePlansProps = {
  plans: StoragePlan[]
}

const StoragePlans: FC<StoragePlansProps> = ({ plans }) => {
  let content: ReactElement | ReactElement[] = (
    <p>There are no plans available</p>
  )

  if (plans?.length) {
    content = plans.map((plan) => (
      <Card key={plan.plan} className={styles.element} plan={plan}></Card>
    ))
  }

  // This CSS custom prop is needed to create the dynamic slider listing all plans
  const style = { '--cards': plans.length } as CSSProperties

  return (
    <section>
      <h1 className={styles.title}>Select a Storage Plan</h1>
      <div style={style} className={styles.wrapper}>
        <div className={styles.innerWrapper}>{content}</div>
      </div>
    </section>
  )
}

export default StoragePlans
