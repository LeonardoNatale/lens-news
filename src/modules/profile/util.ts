import { Profile, MediaSet } from '../../generated/graphql'

const LENS_INFURA_URL = 'https://lens.infura-ipfs.io/ipfs/'

// This seems to work for profiles created on lenster, how can we know which ifps an image is hosted on?
export const makeProfilePictureUrl = (profile: Profile): string => {
  if ((profile.picture as MediaSet)?.original.url) {
    return LENS_INFURA_URL + (profile.picture as MediaSet).original.url.substring(7)
  }
  // TODO handle profile picture as NftImage
  return 'https://picsum.photos/200'
}
