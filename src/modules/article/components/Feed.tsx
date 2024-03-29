import { useQuery } from '@apollo/client'
import {
  ExplorePublicationsDocument,
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes
} from '../../../generated/graphql'
import ArticleCard from './ArticleCard'

const Feed = () => {
  const { data, loading, error } = useQuery(ExplorePublicationsDocument, {
    variables: {
      request: {
        sortCriteria: PublicationSortCriteria.Latest,
        limit: 9,
        noRandomize: false,
        publicationTypes: [PublicationTypes.Post],
        metadata: {
          mainContentFocus: [PublicationMainFocus.Article]
        }
      }
    }
  })

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const articles = data?.explorePublications.items

  return (
    <div className="flex flex-col items-center ">
      <h2 className="text-5xl my-4 font-bold">Recent Articles🗞️</h2>
      <div className="max-w-screen-xl grid grid-cols-3 grid-rows gap-2">
        {articles?.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Feed
