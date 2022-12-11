import { gql } from '@apollo/client'

export const EXPLORE_ARTICLES = gql`
  query Explore(
    $request: ExplorePublicationRequest!
    $reactionRequest: ReactionFieldResolverRequest
    $channelId: ProfileId
  ) {
    explorePublications(request: $request) {
      items {
        ... on Post {
          ...PostFields
          __typename
        }
        ... on Comment {
          ...CommentFields
          __typename
        }
        __typename
      }
      pageInfo {
        totalCount
        next
        __typename
      }
      __typename
    }
  }

  fragment PostFields on Post {
    id
    reaction(request: $reactionRequest)
    profile {
      ...ProfileFields
      __typename
    }
    collectedBy {
      address
      defaultProfile {
        handle
        __typename
      }
      __typename
    }
    referenceModule {
      __typename
    }
    canComment(profileId: $channelId) {
      result
      __typename
    }
    canMirror(profileId: $channelId) {
      result
      __typename
    }
    collectModule {
      ...CollectFields
      __typename
    }
    collectNftAddress
    onChainContentURI
    hidden
    hasCollectedByMe
    stats {
      totalAmountOfComments
      totalAmountOfCollects
      totalAmountOfMirrors
      totalUpvotes
      __typename
    }
    metadata {
      name
      description
      content
      contentWarning
      mainContentFocus
      tags
      media {
        original {
          url
          mimeType
          __typename
        }
        __typename
      }
      cover {
        original {
          url
          __typename
        }
        __typename
      }
      attributes {
        value
        traitType
        __typename
      }
      __typename
    }
    createdAt
    appId
    __typename
  }

  fragment ProfileFields on Profile {
    id
    name
    handle
    bio
    ownedBy
    isDefault
    interests
    isFollowedByMe
    dispatcher {
      canUseRelay
      __typename
    }
    attributes {
      key
      value
      __typename
    }
    stats {
      totalFollowers
      totalPosts
      __typename
    }
    picture {
      ... on MediaSet {
        original {
          url
          __typename
        }
        __typename
      }
      ... on NftImage {
        uri
        __typename
      }
      __typename
    }
    followModule {
      __typename
    }
    __typename
  }

  fragment CollectFields on CollectModule {
    ... on FreeCollectModuleSettings {
      type
      contractAddress
      followerOnly
      __typename
    }
    ... on FeeCollectModuleSettings {
      type
      recipient
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      recipient
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      recipient
      endTimestamp
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    ... on TimedFeeCollectModuleSettings {
      type
      recipient
      endTimestamp
      referralFee
      contractAddress
      followerOnly
      amount {
        asset {
          symbol
          decimals
          address
          __typename
        }
        value
        __typename
      }
      __typename
    }
    __typename
  }

  fragment CommentFields on Comment {
    id
    reaction(request: $reactionRequest)
    profile {
      ...ProfileFields
      __typename
    }
    collectedBy {
      address
      defaultProfile {
        handle
        __typename
      }
      __typename
    }
    collectModule {
      ...CollectFields
      __typename
    }
    referenceModule {
      __typename
    }
    canComment(profileId: $channelId) {
      result
      __typename
    }
    canMirror(profileId: $channelId) {
      result
      __typename
    }
    collectNftAddress
    onChainContentURI
    hidden
    hasCollectedByMe
    stats {
      totalAmountOfComments
      totalAmountOfCollects
      totalAmountOfMirrors
      totalUpvotes
      __typename
    }
    metadata {
      name
      description
      content
      contentWarning
      mainContentFocus
      tags
      media {
        original {
          url
          mimeType
          __typename
        }
        __typename
      }
      cover {
        original {
          url
          __typename
        }
        __typename
      }
      attributes {
        value
        traitType
        __typename
      }
      __typename
    }
    commentOn {
      ... on Post {
        id
        createdAt
        profile {
          ...ProfileFields
          __typename
        }
        metadata {
          name
          cover {
            original {
              url
              __typename
            }
            __typename
          }
          attributes {
            value
            traitType
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    createdAt
    appId
    __typename
  }
`
