import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

type State = {
  name?: string
  street?: string
  city?: string
  state?: string
  zip?: string
  isValid?: boolean
  priceFactor?: number
}

interface Context extends State {
  formData: State
  setFormData: Dispatch<SetStateAction<State>>
}

const FormContext = createContext<Context>({
  formData: {},
  setFormData: () => {},
})

export const useFormContext = () => useContext(FormContext)

export const FormContextProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [formData, setFormData] = useState<State>({})

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  )
}
