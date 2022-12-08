export type CreateProfileRequest = {
  handle: string
  profilePictureUri: string
  followModule: any
  // The follow NFT URI is the NFT metadata your followers will mint when they follow you. This can be updated at all times. If you do not pass in anything it will create a super cool changing NFT which will show the last publication of your profile as the NFT which looks awesome! This means people do not have to worry about writing this logic but still have the ability to customise it for their followers
  followNFTURI: string
}

export type ProfileMetadataRequest = {
  profileId: string
  metadata: string
}

export interface ProfileMetadata {
  version: MetadataVersions

  /**
   * The metadata id can be anything but if your uploading to ipfs
   * you will want it to be random.. using uuid could be an option!
   */
  metadata_id: string
  name: string | null
  bio: string | null
  cover_picture: string | null

  /**
   * Any custom attributes can be added here to save state for a profile
   */
  attributes: AttributeData[]
}

export enum MetadataDisplayType {
  number = 'number',
  string = 'string',
  date = 'date'
}

export enum MetadataVersions {
  one = '1.0.0'
}

export interface AttributeData {
  displayType?: MetadataDisplayType
  traitType?: string
  value: string
  key: string
}
