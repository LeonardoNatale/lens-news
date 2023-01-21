import {
  HasTxHashBeenIndexedRequest,
  HasTxHashBeenIndexedDocument
} from '../generated/graphql'
import { client } from '../pages/_app'
import { generateContext } from '../modules/auth/utils'

const hasTxBeenIndexed = async (request: HasTxHashBeenIndexedRequest, token: string) => {
  // const { data, loading, error } = await useQuery(
  //   HasTxHashBeenIndexedDocument,
  //   { variables: {
  //     txId: request.txId,
  //   },
  //   fetchPolicy: 'network-only',
  // })

  // const result = await useQuery(
  //   HasTxHashBeenIndexedDocument,
  //   { variables: {
  //     txId: request.txId,
  //   },
  //   fetchPolicy: 'network-only',
  // });

  console.log(token)
  console.log(request.txId)

  const result = await client.query({
    query: HasTxHashBeenIndexedDocument,
    variables: {
      txId: request.txId
    },
    ...generateContext(token)
  })

  if (!result.data) {
    console.log('here')
    return false
  }

  console.log('there')

  return result.data.hasTxHashBeenIndexed
}

export const pollUntilIndexed = async (
  input: { txHash: string } | { txId: string },
  token: string
) => {
  while (true) {
    console.log('input', input)
    console.log('token', token)
    const response = await hasTxBeenIndexed(input, token)
    console.log('pool until indexed: result', response)

    if (!response) {
      console.log('null response')
      continue
    }

    console.log(response)

    if (response.__typename === 'TransactionIndexedResult') {
      console.log('pool until indexed: indexed', response.indexed)
      console.log('pool until metadataStatus: metadataStatus', response.metadataStatus)

      console.log(response.metadataStatus)
      if (response.metadataStatus) {
        if (response.metadataStatus.status === 'SUCCESS') {
          return response
        }

        if (response.metadataStatus.status === 'METADATA_VALIDATION_FAILED') {
          throw new Error(response.metadataStatus.status)
        }
      } else {
        if (response.indexed) {
          return response
        }
      }

      console.log('pool until indexed: sleep for 1500 milliseconds then try again')
      // sleep for a second before trying again
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } else {
      // it got reverted and failed!
      throw new Error(response.reason)
    }
  }
}
