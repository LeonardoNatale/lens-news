import { ApolloClient, InMemoryCache } from '@apollo/client'

const API_URL = 'https://api-mumbai.lens.dev'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})
