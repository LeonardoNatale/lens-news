export type CreateProfileRequest = {
  handle: string
  profilePictureUri: string
  followModule: any
  // The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers
  followNFTURI: string
}
