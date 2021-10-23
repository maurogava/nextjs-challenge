export const parsePlanName = (plan: string) => {
  const [a, b] = plan.split('x')

  return `${a}'x${b}'`
}
