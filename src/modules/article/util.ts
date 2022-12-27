import { v4 as uuidv4 } from 'uuid'
import { PublicationMainFocus, PublicationMetadataV2Input } from '../../generated/graphql'

export const makeArticleMetadataRequest = (data: any): PublicationMetadataV2Input => {
  const uuid = uuidv4()

  return {
    ...data,
    mainContentFocus: PublicationMainFocus.Article,
    description: 'Published via lens-news',
    locale: 'en-US',
    external_url: null,
    image: null,
    imageMimeType: null,
    contentWarning: null,
    attributes: [],
    tags: ['article_upload'],
    appId: 'lens_news',
    metadata_id: uuid,
    version: '2.0'
  }
}
