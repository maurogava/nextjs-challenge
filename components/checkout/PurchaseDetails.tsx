import { FC, MouseEvent, useCallback } from 'react'
import cn from 'classnames'
import { useFormContext } from 'components/checkout/useCheckoutForm'
import { StoragePlan } from 'types/storagePlans'

import styles from './PurchaseDetails.module.scss'

type Field = {
  text?: string
}

const AddressField: FC<Field> = ({ text }) => {
  if (!text) {
    return null
  }

  return <span className={styles.addressField}>{text}</span>
}

type PlanProps = {
  plan: StoragePlan
}

const PurchaseDetails: FC<PlanProps> = ({ plan: storagePlan }) => {
  const { name, plan, basePrice } = storagePlan
  const {
    formData: { street, city, state, zip, priceFactor, isValid },
  } = useFormContext()

  const handlePayNow = useCallback((e: MouseEvent) => {
    e.preventDefault
    // Send data for payment
  }, [])

  return (
    <div>
      <p>Plan name: {name}</p>
      <p>Plan size: {plan}</p>

      <address>
        <AddressField text={street} />
        <AddressField text={city} />
        <AddressField text={state} />
        <AddressField text={zip} />
      </address>

      <p>Price: {priceFactor && `$${basePrice * priceFactor}`}</p>

      <button
        type="button"
        disabled={!isValid}
        className={cn(styles.button)}
        onClick={handlePayNow}
      >
        pay now
      </button>
    </div>
  )
}

export default PurchaseDetails
