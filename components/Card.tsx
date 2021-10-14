import { FC } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { StoragePlan } from 'types/storagePlans'

import styles from './Card.module.scss'

const Card: FC<{ plan: StoragePlan }> = ({ plan: storagePlan }) => {
  const { name, plan, description } = storagePlan

  return (
    <div className={styles.wrapper}>
      <h2>{name}</h2>
      <Image
        src={`/images/image-${plan}.jpg`}
        width="295"
        height="195"
        alt={`picture representing a space of ${plan}`}
      />
      <p>{plan}</p>
      <p>{description}</p>

      <Link href={`/checkout/${encodeURIComponent(plan)}`}>
        <a>Select</a>
      </Link>
    </div>
  )
}

export default Card
