/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {\n  authenticate(request: {address: $address, signature: $signature}) {\n    accessToken\n    refreshToken\n  }\n}": types.AuthenticateDocument,
    "query Challenge($address: EthereumAddress!) {\n  challenge(request: {address: $address}) {\n    text\n  }\n}": types.ChallengeDocument,
    "query DefaultProfile($ethereumAddress: EthereumAddress!) {\n  defaultProfile(request: {ethereumAddress: $ethereumAddress}) {\n    id\n    name\n    handle\n    picture {\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n  }\n}": types.DefaultProfileDocument,
    "fragment MediaFields on Media {\n  url\n  width\n  height\n  mimeType\n}\n\nfragment ProfileFields on Profile {\n  id\n  name\n  bio\n  attributes {\n    displayType\n    traitType\n    key\n    value\n  }\n  isFollowedByMe\n  isFollowing(who: null)\n  followNftAddress\n  metadata\n  isDefault\n  handle\n  picture {\n    ... on NftImage {\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      original {\n        ...MediaFields\n      }\n      small {\n        ...MediaFields\n      }\n      medium {\n        ...MediaFields\n      }\n    }\n  }\n  coverPicture {\n    ... on NftImage {\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      original {\n        ...MediaFields\n      }\n      small {\n        ...MediaFields\n      }\n      medium {\n        ...MediaFields\n      }\n    }\n  }\n  ownedBy\n  dispatcher {\n    address\n    canUseRelay\n  }\n  stats {\n    totalFollowers\n    totalFollowing\n    totalPosts\n    totalComments\n    totalMirrors\n    totalPublications\n    totalCollects\n  }\n  followModule {\n    ...FollowModuleFields\n  }\n  onChainIdentity {\n    ens {\n      name\n    }\n    proofOfHumanity\n    sybilDotOrg {\n      verified\n      source {\n        twitter {\n          handle\n        }\n      }\n    }\n    worldcoin {\n      isHuman\n    }\n  }\n}\n\nfragment PublicationStatsFields on PublicationStats {\n  totalAmountOfMirrors\n  totalAmountOfCollects\n  totalAmountOfComments\n  totalUpvotes\n}\n\nfragment MetadataOutputFields on MetadataOutput {\n  name\n  description\n  content\n  media {\n    original {\n      ...MediaFields\n    }\n    small {\n      ...MediaFields\n    }\n    medium {\n      ...MediaFields\n    }\n  }\n  attributes {\n    displayType\n    traitType\n    value\n  }\n  encryptionParams {\n    providerSpecificParams {\n      encryptionKey\n    }\n    accessCondition {\n      ...AccessConditionFields\n    }\n    encryptedFields {\n      animation_url\n      content\n      external_url\n      image\n      media {\n        ...EncryptedMediaSetFields\n      }\n    }\n  }\n}\n\nfragment Erc20Fields on Erc20 {\n  name\n  symbol\n  decimals\n  address\n}\n\nfragment PostFields on Post {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  mirrors(by: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment MirrorBaseFields on Mirror {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment MirrorFields on Mirror {\n  ...MirrorBaseFields\n  mirrorOf {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Comment {\n      ...CommentFields\n    }\n  }\n}\n\nfragment CommentBaseFields on Comment {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  mirrors(by: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment CommentFields on Comment {\n  ...CommentBaseFields\n  mainPost {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Mirror {\n      ...MirrorBaseFields\n      mirrorOf {\n        ... on Post {\n          ...PostFields\n        }\n        ... on Comment {\n          ...CommentMirrorOfFields\n        }\n      }\n    }\n  }\n}\n\nfragment CommentMirrorOfFields on Comment {\n  ...CommentBaseFields\n  mainPost {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Mirror {\n      ...MirrorBaseFields\n    }\n  }\n}\n\nfragment TxReceiptFields on TransactionReceipt {\n  to\n  from\n  contractAddress\n  transactionIndex\n  root\n  gasUsed\n  logsBloom\n  blockHash\n  transactionHash\n  blockNumber\n  confirmations\n  cumulativeGasUsed\n  effectiveGasPrice\n  byzantium\n  type\n  status\n  logs {\n    blockNumber\n    blockHash\n    transactionIndex\n    removed\n    address\n    data\n    topics\n    transactionHash\n    logIndex\n  }\n}\n\nfragment WalletFields on Wallet {\n  address\n  defaultProfile {\n    ...ProfileFields\n  }\n}\n\nfragment CommonPaginatedResultInfoFields on PaginatedResultInfo {\n  prev\n  next\n  totalCount\n}\n\nfragment FollowModuleFields on FollowModule {\n  ... on FeeFollowModuleSettings {\n    type\n    amount {\n      asset {\n        name\n        symbol\n        decimals\n        address\n      }\n      value\n    }\n    recipient\n  }\n  ... on ProfileFollowModuleSettings {\n    type\n    contractAddress\n  }\n  ... on RevertFollowModuleSettings {\n    type\n    contractAddress\n  }\n  ... on UnknownFollowModuleSettings {\n    type\n    contractAddress\n    followModuleReturnData\n  }\n}\n\nfragment CollectModuleFields on CollectModule {\n  __typename\n  ... on FreeCollectModuleSettings {\n    type\n    followerOnly\n    contractAddress\n  }\n  ... on FeeCollectModuleSettings {\n    type\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n  }\n  ... on LimitedFeeCollectModuleSettings {\n    type\n    collectLimit\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n  }\n  ... on LimitedTimedFeeCollectModuleSettings {\n    type\n    collectLimit\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n    endTimestamp\n  }\n  ... on RevertCollectModuleSettings {\n    type\n  }\n  ... on TimedFeeCollectModuleSettings {\n    type\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n    endTimestamp\n  }\n  ... on UnknownCollectModuleSettings {\n    type\n    contractAddress\n    collectModuleReturnData\n  }\n}\n\nfragment ReferenceModuleFields on ReferenceModule {\n  ... on FollowOnlyReferenceModuleSettings {\n    type\n    contractAddress\n  }\n  ... on UnknownReferenceModuleSettings {\n    type\n    contractAddress\n    referenceModuleReturnData\n  }\n  ... on DegreesOfSeparationReferenceModuleSettings {\n    type\n    contractAddress\n    commentsRestricted\n    mirrorsRestricted\n    degreesOfSeparation\n  }\n}\n\nfragment Erc20OwnershipFields on Erc20OwnershipOutput {\n  contractAddress\n  amount\n  chainID\n  condition\n  decimals\n}\n\nfragment EoaOwnershipFields on EoaOwnershipOutput {\n  address\n}\n\nfragment NftOwnershipFields on NftOwnershipOutput {\n  contractAddress\n  chainID\n  contractType\n  tokenIds\n}\n\nfragment ProfileOwnershipFields on ProfileOwnershipOutput {\n  profileId\n}\n\nfragment FollowConditionFields on FollowConditionOutput {\n  profileId\n}\n\nfragment CollectConditionFields on CollectConditionOutput {\n  publicationId\n  thisPublication\n}\n\nfragment AndConditionFields on AndConditionOutput {\n  criteria {\n    ...AccessConditionFields\n  }\n}\n\nfragment OrConditionFields on OrConditionOutput {\n  criteria {\n    ...AccessConditionFields\n  }\n}\n\nfragment AndConditionFieldsNoRecursive on AndConditionOutput {\n  criteria {\n    ...SimpleConditionFields\n  }\n}\n\nfragment OrConditionFieldsNoRecursive on OrConditionOutput {\n  criteria {\n    ...SimpleConditionFields\n  }\n}\n\nfragment SimpleConditionFields on AccessConditionOutput {\n  nft {\n    ...NftOwnershipFields\n  }\n  eoa {\n    ...EoaOwnershipFields\n  }\n  token {\n    ...Erc20OwnershipFields\n  }\n  profile {\n    ...ProfileOwnershipFields\n  }\n  follow {\n    ...FollowConditionFields\n  }\n  collect {\n    ...CollectConditionFields\n  }\n}\n\nfragment BooleanConditionFieldsRecursive on AccessConditionOutput {\n  and {\n    criteria {\n      ...SimpleConditionFields\n      and {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n      or {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n    }\n  }\n  or {\n    criteria {\n      ...SimpleConditionFields\n      and {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n      or {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n    }\n  }\n}\n\nfragment AccessConditionFields on AccessConditionOutput {\n  ...SimpleConditionFields\n  ...BooleanConditionFieldsRecursive\n}\n\nfragment EncryptedMediaFields on EncryptedMedia {\n  url\n  width\n  height\n  mimeType\n}\n\nfragment EncryptedMediaSetFields on EncryptedMediaSet {\n  original {\n    ...EncryptedMediaFields\n  }\n  small {\n    ...EncryptedMediaFields\n  }\n  medium {\n    ...EncryptedMediaFields\n  }\n}": types.MediaFieldsFragmentDoc,
    "mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {\n  createPostViaDispatcher(request: $request) {\n    ... on RelayerResult {\n      txHash\n      txId\n    }\n    ... on RelayError {\n      reason\n    }\n  }\n}": types.CreatePostViaDispatcherDocument,
    "query doesFollow($request: DoesFollowRequest!) {\n  doesFollow(request: $request) {\n    followerAddress\n    profileId\n    follows\n  }\n}": types.DoesFollowDocument,
    "query exploreProfiles($request: ExploreProfilesRequest!) {\n  exploreProfiles(request: $request) {\n    items {\n      ...ProfileFields\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}": types.ExploreProfilesDocument,
    "query ExplorePublications($request: ExplorePublicationRequest!) {\n  explorePublications(request: $request) {\n    items {\n      __typename\n      ... on Post {\n        ...PostFields\n      }\n      ... on Comment {\n        ...CommentFields\n      }\n      ... on Mirror {\n        ...MirrorFields\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}": types.ExplorePublicationsDocument,
    "query following($request: FollowingRequest!) {\n  following(request: $request) {\n    items {\n      profile {\n        ...ProfileFields\n      }\n      totalAmountOfTimesFollowing\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}": types.FollowingDocument,
    "query profile($request: SingleProfileQueryRequest!) {\n  profile(request: $request) {\n    ...ProfileFields\n  }\n}": types.ProfileDocument,
    "query publication($request: PublicationQueryRequest!) {\n  publication(request: $request) {\n    __typename\n    ... on Post {\n      ...PostFields\n    }\n    ... on Comment {\n      ...CommentFields\n    }\n    ... on Mirror {\n      ...MirrorFields\n    }\n  }\n}": types.PublicationDocument,
    "query publications($request: PublicationsQueryRequest!) {\n  publications(request: $request) {\n    items {\n      __typename\n      ... on Post {\n        ...PostFields\n      }\n      ... on Comment {\n        ...CommentFields\n      }\n      ... on Mirror {\n        ...MirrorFields\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}": types.PublicationsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {\n  authenticate(request: {address: $address, signature: $signature}) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {\n  authenticate(request: {address: $address, signature: $signature}) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Challenge($address: EthereumAddress!) {\n  challenge(request: {address: $address}) {\n    text\n  }\n}"): (typeof documents)["query Challenge($address: EthereumAddress!) {\n  challenge(request: {address: $address}) {\n    text\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query DefaultProfile($ethereumAddress: EthereumAddress!) {\n  defaultProfile(request: {ethereumAddress: $ethereumAddress}) {\n    id\n    name\n    handle\n    picture {\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query DefaultProfile($ethereumAddress: EthereumAddress!) {\n  defaultProfile(request: {ethereumAddress: $ethereumAddress}) {\n    id\n    name\n    handle\n    picture {\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment MediaFields on Media {\n  url\n  width\n  height\n  mimeType\n}\n\nfragment ProfileFields on Profile {\n  id\n  name\n  bio\n  attributes {\n    displayType\n    traitType\n    key\n    value\n  }\n  isFollowedByMe\n  isFollowing(who: null)\n  followNftAddress\n  metadata\n  isDefault\n  handle\n  picture {\n    ... on NftImage {\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      original {\n        ...MediaFields\n      }\n      small {\n        ...MediaFields\n      }\n      medium {\n        ...MediaFields\n      }\n    }\n  }\n  coverPicture {\n    ... on NftImage {\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      original {\n        ...MediaFields\n      }\n      small {\n        ...MediaFields\n      }\n      medium {\n        ...MediaFields\n      }\n    }\n  }\n  ownedBy\n  dispatcher {\n    address\n    canUseRelay\n  }\n  stats {\n    totalFollowers\n    totalFollowing\n    totalPosts\n    totalComments\n    totalMirrors\n    totalPublications\n    totalCollects\n  }\n  followModule {\n    ...FollowModuleFields\n  }\n  onChainIdentity {\n    ens {\n      name\n    }\n    proofOfHumanity\n    sybilDotOrg {\n      verified\n      source {\n        twitter {\n          handle\n        }\n      }\n    }\n    worldcoin {\n      isHuman\n    }\n  }\n}\n\nfragment PublicationStatsFields on PublicationStats {\n  totalAmountOfMirrors\n  totalAmountOfCollects\n  totalAmountOfComments\n  totalUpvotes\n}\n\nfragment MetadataOutputFields on MetadataOutput {\n  name\n  description\n  content\n  media {\n    original {\n      ...MediaFields\n    }\n    small {\n      ...MediaFields\n    }\n    medium {\n      ...MediaFields\n    }\n  }\n  attributes {\n    displayType\n    traitType\n    value\n  }\n  encryptionParams {\n    providerSpecificParams {\n      encryptionKey\n    }\n    accessCondition {\n      ...AccessConditionFields\n    }\n    encryptedFields {\n      animation_url\n      content\n      external_url\n      image\n      media {\n        ...EncryptedMediaSetFields\n      }\n    }\n  }\n}\n\nfragment Erc20Fields on Erc20 {\n  name\n  symbol\n  decimals\n  address\n}\n\nfragment PostFields on Post {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  mirrors(by: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment MirrorBaseFields on Mirror {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment MirrorFields on Mirror {\n  ...MirrorBaseFields\n  mirrorOf {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Comment {\n      ...CommentFields\n    }\n  }\n}\n\nfragment CommentBaseFields on Comment {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  mirrors(by: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment CommentFields on Comment {\n  ...CommentBaseFields\n  mainPost {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Mirror {\n      ...MirrorBaseFields\n      mirrorOf {\n        ... on Post {\n          ...PostFields\n        }\n        ... on Comment {\n          ...CommentMirrorOfFields\n        }\n      }\n    }\n  }\n}\n\nfragment CommentMirrorOfFields on Comment {\n  ...CommentBaseFields\n  mainPost {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Mirror {\n      ...MirrorBaseFields\n    }\n  }\n}\n\nfragment TxReceiptFields on TransactionReceipt {\n  to\n  from\n  contractAddress\n  transactionIndex\n  root\n  gasUsed\n  logsBloom\n  blockHash\n  transactionHash\n  blockNumber\n  confirmations\n  cumulativeGasUsed\n  effectiveGasPrice\n  byzantium\n  type\n  status\n  logs {\n    blockNumber\n    blockHash\n    transactionIndex\n    removed\n    address\n    data\n    topics\n    transactionHash\n    logIndex\n  }\n}\n\nfragment WalletFields on Wallet {\n  address\n  defaultProfile {\n    ...ProfileFields\n  }\n}\n\nfragment CommonPaginatedResultInfoFields on PaginatedResultInfo {\n  prev\n  next\n  totalCount\n}\n\nfragment FollowModuleFields on FollowModule {\n  ... on FeeFollowModuleSettings {\n    type\n    amount {\n      asset {\n        name\n        symbol\n        decimals\n        address\n      }\n      value\n    }\n    recipient\n  }\n  ... on ProfileFollowModuleSettings {\n    type\n    contractAddress\n  }\n  ... on RevertFollowModuleSettings {\n    type\n    contractAddress\n  }\n  ... on UnknownFollowModuleSettings {\n    type\n    contractAddress\n    followModuleReturnData\n  }\n}\n\nfragment CollectModuleFields on CollectModule {\n  __typename\n  ... on FreeCollectModuleSettings {\n    type\n    followerOnly\n    contractAddress\n  }\n  ... on FeeCollectModuleSettings {\n    type\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n  }\n  ... on LimitedFeeCollectModuleSettings {\n    type\n    collectLimit\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n  }\n  ... on LimitedTimedFeeCollectModuleSettings {\n    type\n    collectLimit\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n    endTimestamp\n  }\n  ... on RevertCollectModuleSettings {\n    type\n  }\n  ... on TimedFeeCollectModuleSettings {\n    type\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n    endTimestamp\n  }\n  ... on UnknownCollectModuleSettings {\n    type\n    contractAddress\n    collectModuleReturnData\n  }\n}\n\nfragment ReferenceModuleFields on ReferenceModule {\n  ... on FollowOnlyReferenceModuleSettings {\n    type\n    contractAddress\n  }\n  ... on UnknownReferenceModuleSettings {\n    type\n    contractAddress\n    referenceModuleReturnData\n  }\n  ... on DegreesOfSeparationReferenceModuleSettings {\n    type\n    contractAddress\n    commentsRestricted\n    mirrorsRestricted\n    degreesOfSeparation\n  }\n}\n\nfragment Erc20OwnershipFields on Erc20OwnershipOutput {\n  contractAddress\n  amount\n  chainID\n  condition\n  decimals\n}\n\nfragment EoaOwnershipFields on EoaOwnershipOutput {\n  address\n}\n\nfragment NftOwnershipFields on NftOwnershipOutput {\n  contractAddress\n  chainID\n  contractType\n  tokenIds\n}\n\nfragment ProfileOwnershipFields on ProfileOwnershipOutput {\n  profileId\n}\n\nfragment FollowConditionFields on FollowConditionOutput {\n  profileId\n}\n\nfragment CollectConditionFields on CollectConditionOutput {\n  publicationId\n  thisPublication\n}\n\nfragment AndConditionFields on AndConditionOutput {\n  criteria {\n    ...AccessConditionFields\n  }\n}\n\nfragment OrConditionFields on OrConditionOutput {\n  criteria {\n    ...AccessConditionFields\n  }\n}\n\nfragment AndConditionFieldsNoRecursive on AndConditionOutput {\n  criteria {\n    ...SimpleConditionFields\n  }\n}\n\nfragment OrConditionFieldsNoRecursive on OrConditionOutput {\n  criteria {\n    ...SimpleConditionFields\n  }\n}\n\nfragment SimpleConditionFields on AccessConditionOutput {\n  nft {\n    ...NftOwnershipFields\n  }\n  eoa {\n    ...EoaOwnershipFields\n  }\n  token {\n    ...Erc20OwnershipFields\n  }\n  profile {\n    ...ProfileOwnershipFields\n  }\n  follow {\n    ...FollowConditionFields\n  }\n  collect {\n    ...CollectConditionFields\n  }\n}\n\nfragment BooleanConditionFieldsRecursive on AccessConditionOutput {\n  and {\n    criteria {\n      ...SimpleConditionFields\n      and {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n      or {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n    }\n  }\n  or {\n    criteria {\n      ...SimpleConditionFields\n      and {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n      or {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n    }\n  }\n}\n\nfragment AccessConditionFields on AccessConditionOutput {\n  ...SimpleConditionFields\n  ...BooleanConditionFieldsRecursive\n}\n\nfragment EncryptedMediaFields on EncryptedMedia {\n  url\n  width\n  height\n  mimeType\n}\n\nfragment EncryptedMediaSetFields on EncryptedMediaSet {\n  original {\n    ...EncryptedMediaFields\n  }\n  small {\n    ...EncryptedMediaFields\n  }\n  medium {\n    ...EncryptedMediaFields\n  }\n}"): (typeof documents)["fragment MediaFields on Media {\n  url\n  width\n  height\n  mimeType\n}\n\nfragment ProfileFields on Profile {\n  id\n  name\n  bio\n  attributes {\n    displayType\n    traitType\n    key\n    value\n  }\n  isFollowedByMe\n  isFollowing(who: null)\n  followNftAddress\n  metadata\n  isDefault\n  handle\n  picture {\n    ... on NftImage {\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      original {\n        ...MediaFields\n      }\n      small {\n        ...MediaFields\n      }\n      medium {\n        ...MediaFields\n      }\n    }\n  }\n  coverPicture {\n    ... on NftImage {\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      original {\n        ...MediaFields\n      }\n      small {\n        ...MediaFields\n      }\n      medium {\n        ...MediaFields\n      }\n    }\n  }\n  ownedBy\n  dispatcher {\n    address\n    canUseRelay\n  }\n  stats {\n    totalFollowers\n    totalFollowing\n    totalPosts\n    totalComments\n    totalMirrors\n    totalPublications\n    totalCollects\n  }\n  followModule {\n    ...FollowModuleFields\n  }\n  onChainIdentity {\n    ens {\n      name\n    }\n    proofOfHumanity\n    sybilDotOrg {\n      verified\n      source {\n        twitter {\n          handle\n        }\n      }\n    }\n    worldcoin {\n      isHuman\n    }\n  }\n}\n\nfragment PublicationStatsFields on PublicationStats {\n  totalAmountOfMirrors\n  totalAmountOfCollects\n  totalAmountOfComments\n  totalUpvotes\n}\n\nfragment MetadataOutputFields on MetadataOutput {\n  name\n  description\n  content\n  media {\n    original {\n      ...MediaFields\n    }\n    small {\n      ...MediaFields\n    }\n    medium {\n      ...MediaFields\n    }\n  }\n  attributes {\n    displayType\n    traitType\n    value\n  }\n  encryptionParams {\n    providerSpecificParams {\n      encryptionKey\n    }\n    accessCondition {\n      ...AccessConditionFields\n    }\n    encryptedFields {\n      animation_url\n      content\n      external_url\n      image\n      media {\n        ...EncryptedMediaSetFields\n      }\n    }\n  }\n}\n\nfragment Erc20Fields on Erc20 {\n  name\n  symbol\n  decimals\n  address\n}\n\nfragment PostFields on Post {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  mirrors(by: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment MirrorBaseFields on Mirror {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment MirrorFields on Mirror {\n  ...MirrorBaseFields\n  mirrorOf {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Comment {\n      ...CommentFields\n    }\n  }\n}\n\nfragment CommentBaseFields on Comment {\n  id\n  profile {\n    ...ProfileFields\n  }\n  stats {\n    ...PublicationStatsFields\n  }\n  metadata {\n    ...MetadataOutputFields\n  }\n  createdAt\n  collectModule {\n    ...CollectModuleFields\n  }\n  referenceModule {\n    ...ReferenceModuleFields\n  }\n  appId\n  hidden\n  reaction(request: null)\n  mirrors(by: null)\n  hasCollectedByMe\n  isGated\n}\n\nfragment CommentFields on Comment {\n  ...CommentBaseFields\n  mainPost {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Mirror {\n      ...MirrorBaseFields\n      mirrorOf {\n        ... on Post {\n          ...PostFields\n        }\n        ... on Comment {\n          ...CommentMirrorOfFields\n        }\n      }\n    }\n  }\n}\n\nfragment CommentMirrorOfFields on Comment {\n  ...CommentBaseFields\n  mainPost {\n    ... on Post {\n      ...PostFields\n    }\n    ... on Mirror {\n      ...MirrorBaseFields\n    }\n  }\n}\n\nfragment TxReceiptFields on TransactionReceipt {\n  to\n  from\n  contractAddress\n  transactionIndex\n  root\n  gasUsed\n  logsBloom\n  blockHash\n  transactionHash\n  blockNumber\n  confirmations\n  cumulativeGasUsed\n  effectiveGasPrice\n  byzantium\n  type\n  status\n  logs {\n    blockNumber\n    blockHash\n    transactionIndex\n    removed\n    address\n    data\n    topics\n    transactionHash\n    logIndex\n  }\n}\n\nfragment WalletFields on Wallet {\n  address\n  defaultProfile {\n    ...ProfileFields\n  }\n}\n\nfragment CommonPaginatedResultInfoFields on PaginatedResultInfo {\n  prev\n  next\n  totalCount\n}\n\nfragment FollowModuleFields on FollowModule {\n  ... on FeeFollowModuleSettings {\n    type\n    amount {\n      asset {\n        name\n        symbol\n        decimals\n        address\n      }\n      value\n    }\n    recipient\n  }\n  ... on ProfileFollowModuleSettings {\n    type\n    contractAddress\n  }\n  ... on RevertFollowModuleSettings {\n    type\n    contractAddress\n  }\n  ... on UnknownFollowModuleSettings {\n    type\n    contractAddress\n    followModuleReturnData\n  }\n}\n\nfragment CollectModuleFields on CollectModule {\n  __typename\n  ... on FreeCollectModuleSettings {\n    type\n    followerOnly\n    contractAddress\n  }\n  ... on FeeCollectModuleSettings {\n    type\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n  }\n  ... on LimitedFeeCollectModuleSettings {\n    type\n    collectLimit\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n  }\n  ... on LimitedTimedFeeCollectModuleSettings {\n    type\n    collectLimit\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n    endTimestamp\n  }\n  ... on RevertCollectModuleSettings {\n    type\n  }\n  ... on TimedFeeCollectModuleSettings {\n    type\n    amount {\n      asset {\n        ...Erc20Fields\n      }\n      value\n    }\n    recipient\n    referralFee\n    endTimestamp\n  }\n  ... on UnknownCollectModuleSettings {\n    type\n    contractAddress\n    collectModuleReturnData\n  }\n}\n\nfragment ReferenceModuleFields on ReferenceModule {\n  ... on FollowOnlyReferenceModuleSettings {\n    type\n    contractAddress\n  }\n  ... on UnknownReferenceModuleSettings {\n    type\n    contractAddress\n    referenceModuleReturnData\n  }\n  ... on DegreesOfSeparationReferenceModuleSettings {\n    type\n    contractAddress\n    commentsRestricted\n    mirrorsRestricted\n    degreesOfSeparation\n  }\n}\n\nfragment Erc20OwnershipFields on Erc20OwnershipOutput {\n  contractAddress\n  amount\n  chainID\n  condition\n  decimals\n}\n\nfragment EoaOwnershipFields on EoaOwnershipOutput {\n  address\n}\n\nfragment NftOwnershipFields on NftOwnershipOutput {\n  contractAddress\n  chainID\n  contractType\n  tokenIds\n}\n\nfragment ProfileOwnershipFields on ProfileOwnershipOutput {\n  profileId\n}\n\nfragment FollowConditionFields on FollowConditionOutput {\n  profileId\n}\n\nfragment CollectConditionFields on CollectConditionOutput {\n  publicationId\n  thisPublication\n}\n\nfragment AndConditionFields on AndConditionOutput {\n  criteria {\n    ...AccessConditionFields\n  }\n}\n\nfragment OrConditionFields on OrConditionOutput {\n  criteria {\n    ...AccessConditionFields\n  }\n}\n\nfragment AndConditionFieldsNoRecursive on AndConditionOutput {\n  criteria {\n    ...SimpleConditionFields\n  }\n}\n\nfragment OrConditionFieldsNoRecursive on OrConditionOutput {\n  criteria {\n    ...SimpleConditionFields\n  }\n}\n\nfragment SimpleConditionFields on AccessConditionOutput {\n  nft {\n    ...NftOwnershipFields\n  }\n  eoa {\n    ...EoaOwnershipFields\n  }\n  token {\n    ...Erc20OwnershipFields\n  }\n  profile {\n    ...ProfileOwnershipFields\n  }\n  follow {\n    ...FollowConditionFields\n  }\n  collect {\n    ...CollectConditionFields\n  }\n}\n\nfragment BooleanConditionFieldsRecursive on AccessConditionOutput {\n  and {\n    criteria {\n      ...SimpleConditionFields\n      and {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n      or {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n    }\n  }\n  or {\n    criteria {\n      ...SimpleConditionFields\n      and {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n      or {\n        criteria {\n          ...SimpleConditionFields\n        }\n      }\n    }\n  }\n}\n\nfragment AccessConditionFields on AccessConditionOutput {\n  ...SimpleConditionFields\n  ...BooleanConditionFieldsRecursive\n}\n\nfragment EncryptedMediaFields on EncryptedMedia {\n  url\n  width\n  height\n  mimeType\n}\n\nfragment EncryptedMediaSetFields on EncryptedMediaSet {\n  original {\n    ...EncryptedMediaFields\n  }\n  small {\n    ...EncryptedMediaFields\n  }\n  medium {\n    ...EncryptedMediaFields\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {\n  createPostViaDispatcher(request: $request) {\n    ... on RelayerResult {\n      txHash\n      txId\n    }\n    ... on RelayError {\n      reason\n    }\n  }\n}"): (typeof documents)["mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {\n  createPostViaDispatcher(request: $request) {\n    ... on RelayerResult {\n      txHash\n      txId\n    }\n    ... on RelayError {\n      reason\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query doesFollow($request: DoesFollowRequest!) {\n  doesFollow(request: $request) {\n    followerAddress\n    profileId\n    follows\n  }\n}"): (typeof documents)["query doesFollow($request: DoesFollowRequest!) {\n  doesFollow(request: $request) {\n    followerAddress\n    profileId\n    follows\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query exploreProfiles($request: ExploreProfilesRequest!) {\n  exploreProfiles(request: $request) {\n    items {\n      ...ProfileFields\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"): (typeof documents)["query exploreProfiles($request: ExploreProfilesRequest!) {\n  exploreProfiles(request: $request) {\n    items {\n      ...ProfileFields\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ExplorePublications($request: ExplorePublicationRequest!) {\n  explorePublications(request: $request) {\n    items {\n      __typename\n      ... on Post {\n        ...PostFields\n      }\n      ... on Comment {\n        ...CommentFields\n      }\n      ... on Mirror {\n        ...MirrorFields\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"): (typeof documents)["query ExplorePublications($request: ExplorePublicationRequest!) {\n  explorePublications(request: $request) {\n    items {\n      __typename\n      ... on Post {\n        ...PostFields\n      }\n      ... on Comment {\n        ...CommentFields\n      }\n      ... on Mirror {\n        ...MirrorFields\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query following($request: FollowingRequest!) {\n  following(request: $request) {\n    items {\n      profile {\n        ...ProfileFields\n      }\n      totalAmountOfTimesFollowing\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"): (typeof documents)["query following($request: FollowingRequest!) {\n  following(request: $request) {\n    items {\n      profile {\n        ...ProfileFields\n      }\n      totalAmountOfTimesFollowing\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query profile($request: SingleProfileQueryRequest!) {\n  profile(request: $request) {\n    ...ProfileFields\n  }\n}"): (typeof documents)["query profile($request: SingleProfileQueryRequest!) {\n  profile(request: $request) {\n    ...ProfileFields\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query publication($request: PublicationQueryRequest!) {\n  publication(request: $request) {\n    __typename\n    ... on Post {\n      ...PostFields\n    }\n    ... on Comment {\n      ...CommentFields\n    }\n    ... on Mirror {\n      ...MirrorFields\n    }\n  }\n}"): (typeof documents)["query publication($request: PublicationQueryRequest!) {\n  publication(request: $request) {\n    __typename\n    ... on Post {\n      ...PostFields\n    }\n    ... on Comment {\n      ...CommentFields\n    }\n    ... on Mirror {\n      ...MirrorFields\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query publications($request: PublicationsQueryRequest!) {\n  publications(request: $request) {\n    items {\n      __typename\n      ... on Post {\n        ...PostFields\n      }\n      ... on Comment {\n        ...CommentFields\n      }\n      ... on Mirror {\n        ...MirrorFields\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"): (typeof documents)["query publications($request: PublicationsQueryRequest!) {\n  publications(request: $request) {\n    items {\n      __typename\n      ... on Post {\n        ...PostFields\n      }\n      ... on Comment {\n        ...CommentFields\n      }\n      ... on Mirror {\n        ...MirrorFields\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfoFields\n    }\n  }\n}"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;