import { FC } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { StoragePlan } from 'types/storagePlans'
import { parsePlanName } from 'utils/parsing'

import styles from './Card.module.scss'

type CardProps = {
  plan: StoragePlan
  className?: string
}

const Card: FC<CardProps> = ({ plan: storagePlan, className }) => {
  const { name, plan, description } = storagePlan

  return (
    <article className={cn(styles.card, className)}>
      <h2 className={styles.title}>{name}</h2>

      <Image
        src={`/images/image-${plan}.jpg`}
        width="295"
        height="195"
        alt={`picture representing a space of ${plan}`}
      />

      <p className={styles.planSize}>{parsePlanName(plan)}</p>
      <p className={styles.description}>{description}</p>

      <Link href={`/checkout/${encodeURIComponent(plan)}`}>
        <a className="btn">Select</a>
      </Link>
    </article>
  )
}

export default Card
