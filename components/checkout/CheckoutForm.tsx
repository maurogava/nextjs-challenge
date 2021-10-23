import { FC, useCallback, useEffect } from 'react'
import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { useFormContext } from 'components/checkout/useCheckoutForm'
import { isZip, serverValidation } from 'utils/validation'

import styles from './CheckoutForm.module.scss'

const CheckoutForm: FC = () => {
  const { setFormData } = useFormContext()
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })

  // Method to check the zip code client side
  const checkZip = useCallback(
    (zip) => {
      if (!isZip(zip)) {
        // We need to update the form context in order to clean the price in the details
        setFormData((prev) => ({ ...prev, priceFactor: undefined }))
        // Returning a personalized error message
        return 'Invalid Zip code'
      }

      return true
    },
    [setFormData]
  )

  // Method to check the zip code server side and if it's valid return the "price factor"
  const checkZipAndSetPriceFactor = useCallback(
    async (zip) => {
      const res = await serverValidation(`/api/get-price-factor/${zip}`)
      // We need to update the form context in order to set the "price factor"
      // if there was an error the "price factor" will be "undefined" cleaning up the price in the details
      setFormData((prev) => ({ ...prev, priceFactor: res.priceFactor }))

      if (res.error) {
        return res.error
      }

      return true
    },
    [setFormData]
  )

  // Update the form context when there is change in the form fields
  useEffect(() => {
    const subscription = watch((fields, { name }) => {
      name && setFormData((prev) => ({ ...prev, [name]: fields[name] }))
    })

    return () => subscription.unsubscribe()
  }, [setFormData, watch])

  // update the "isValid" prop in the form context which is used to enable or disable
  // the "Pay Now" button
  useEffect(() => {
    setFormData((prev) => ({ ...prev, isValid }))
  }, [isValid, setFormData])

  // We could create input components to separate better the code, improve performance avoiding some
  // unnecessary re-renders. WE can even compose that Input component to create a InputZip component moving in it
  // all the loginc regarding Zip validation. I didn't do it for lack of time.
  return (
    <form>
      <div className={cn(styles.inputWrapper, { [styles.error]: errors.name })}>
        <label htmlFor="name">Name:</label>
        <input type="text" {...register('name', { required: true })} />
      </div>

      <div
        className={cn(styles.inputWrapper, { [styles.error]: errors.street })}
      >
        <label htmlFor="street">Street:</label>
        <input type="text" {...register('street', { required: true })} />
      </div>

      <div className={styles.grid}>
        <div
          className={cn(styles.inputWrapper, { [styles.error]: errors.city })}
        >
          <label htmlFor="city">City:</label>
          <input type="text" {...register('city', { required: true })} />
        </div>

        <div
          className={cn(styles.inputWrapper, { [styles.error]: errors.state })}
        >
          <label htmlFor="state">State:</label>
          <input type="text" {...register('state', { required: true })} />
        </div>

        <div
          className={cn(styles.inputWrapper, { [styles.error]: errors.zip })}
        >
          <label htmlFor="zip">Zip:</label>
          <input
            type="text"
            {...register('zip', {
              required: true,
              validate: {
                client: checkZip,
                server: async (val) => await checkZipAndSetPriceFactor(val),
              },
            })}
          />
          {errors.zip && <p>{errors.zip?.message}</p>}
        </div>
      </div>
    </form>
  )
}

export default CheckoutForm
