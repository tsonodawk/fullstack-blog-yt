import { headers } from 'next/headers'

export const getApiBase = async () => {
  // const headersData = headers()
  // const host = headersData.get('host')
  // const protocol = host?.startsWith('localhost') ? 'http' : 'https'
  // const apiBase = `${protocol}://${host}`

  // return apiBase
  console.log(process.env.API_BASE)

  return process.env.API_BASE
}
