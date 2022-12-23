import {
  PublicationMetadataVersions,
  PublicationMetadata,
  PublicationMainFocus
} from '../article.type'
import { v4 as uuidv4 } from 'uuid'

export const makeArticleMetadataRequest = (data: any): PublicationMetadata => {
  const uuid = uuidv4()

  return {
    ...data,
    mainContentFocus: PublicationMainFocus.ARTICLE,
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
    version: PublicationMetadataVersions.two
  }
}
