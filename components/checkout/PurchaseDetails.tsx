import { FC, MouseEvent, useCallback, memo } from 'react'
import cn from 'classnames'
import { useFormContext } from 'components/checkout/useCheckoutForm'
import { StoragePlan } from 'types/storagePlans'
import { parsePlanName } from 'utils/parsing'

import styles from './PurchaseDetails.module.scss'

type Field = {
  text?: string
}

// This AddressField is using "memo" to prevent unnecessary re-renders when typing in the Form
const AddressField: FC<Field> = memo(function AddressField({ text }) {
  if (!text) {
    return null
  }

  return <span className={styles.addressField}>{text}</span>
})

type PlanProps = {
  plan: StoragePlan
}

const PurchaseDetails: FC<PlanProps> = ({ plan: storagePlan }) => {
  const { name, plan, basePrice } = storagePlan
  const {
    formData: { street, city, state, zip, priceFactor, isValid },
  } = useFormContext()

  // Method where is going to be handled the "Pay Now" action
  const handlePayNow = useCallback((e: MouseEvent) => {
    e.preventDefault
    console.log('handlePayNow')
    // Send payment data
  }, [])

  return (
    <div className={styles.detailsWrapper}>
      <p className={styles.planName}>
        <strong>Plan:</strong> {name}
      </p>

      <p>
        <strong>Size:</strong> {parsePlanName(plan)}
      </p>

      <address className={styles.addressWrapper}>
        <strong>Address: </strong>
        <AddressField text={street} />
        <AddressField text={city} />
        <AddressField text={state} />
        <AddressField text={zip} />
      </address>

      <p className={styles.price}>
        <strong>Price:</strong> {priceFactor && `$${basePrice * priceFactor}`}
      </p>

      <div className={styles.btnWrapper}>
        <button
          type="button"
          disabled={!isValid}
          className={cn('btn', styles.button)}
          onClick={handlePayNow}
        >
          Pay Now
        </button>
      </div>
    </div>
  )
}

export default PurchaseDetails
