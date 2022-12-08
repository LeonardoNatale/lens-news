import { MetadataVersions, ProfileMetadata } from '../profile.type'
import { v4 as uuidv4 } from 'uuid'

export const makeProfileMetadataRequest = (data: any): ProfileMetadata => {
  const uuid = uuidv4()

  return {
    ...data,
    metadata_id: uuid,
    version: MetadataVersions.one,
    attributes: []
  }
}
