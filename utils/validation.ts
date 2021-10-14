export const isZip = (zip: string) => {
  return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)
}

export const serverValidation = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    return { error: 'There was a server error' }
  }

  let response

  try {
    response = await res.json()
  } catch {
    return { error: 'There was an error parsing the response' }
  }

  return response
}
