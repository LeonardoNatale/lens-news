import { gql } from '@apollo/client'

export const CREATE_PUBLICATION = gql`
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    createPostViaDispatcher(request: $request) {
      ... on RelayerResult {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }
`
