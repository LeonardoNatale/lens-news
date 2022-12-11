import { PublicationMetadataVersions, PublicationMetadata } from '../article.type'
import { v4 as uuidv4 } from 'uuid'

export const makeArticleMetadataRequest = (data: any): PublicationMetadata => {
  const uuid = uuidv4()

  return {
    ...data,
    metadata_id: uuid,
    version: PublicationMetadataVersions.two,
    attributes: []
  }
}
