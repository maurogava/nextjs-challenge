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

  const checkZipAndSetPriceFactor = useCallback(
    async (zip) => {
      const res = await serverValidation(`/api/get-price-factor/${zip}`)

      if (res.error) {
        return res.error
      }

      setFormData((prev) => ({ ...prev, priceFactor: res.priceFactor }))

      return true
    },
    [setFormData]
  )

  useEffect(() => {
    const subscription = watch((fields, { name }) => {
      name && setFormData((prev) => ({ ...prev, [name]: fields[name] }))
    })

    return () => subscription.unsubscribe()
  }, [setFormData, watch])

  useEffect(() => {
    setFormData((prev) => ({ ...prev, isValid }))
  }, [isValid, setFormData])

  console.log('>>> render CheckoutForm')

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

      <div className={cn(styles.inputWrapper, { [styles.error]: errors.city })}>
        <label htmlFor="city">City:</label>
        <input type="text" {...register('city', { required: true })} />
      </div>

      <div
        className={cn(styles.inputWrapper, { [styles.error]: errors.state })}
      >
        <label htmlFor="state">State:</label>
        <input type="text" {...register('state', { required: true })} />
      </div>

      <div className={cn(styles.inputWrapper, { [styles.error]: errors.zip })}>
        <label htmlFor="zip">Zip:</label>
        <input
          type="text"
          {...register('zip', {
            required: true,
            validate: {
              client: (val) => isZip(val) || 'Invalid Zip code',
              server: async (val) => await checkZipAndSetPriceFactor(val),
            },
          })}
        />
        {errors.zip && <p>{errors.zip?.message}</p>}
      </div>
    </form>
  )
}

export default CheckoutForm
