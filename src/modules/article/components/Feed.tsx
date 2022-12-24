import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { EXPLORE_ARTICLES } from '../explore-articles'
import ArticleCard from './ArticleCard'

const Feed = () => {
  const { data, loading, error } = useQuery(EXPLORE_ARTICLES, {
    variables: {
      request: {
        sortCriteria: 'LATEST',
        limit: 9,
        noRandomize: false,
        publicationTypes: ['POST'],
        metadata: {
          mainContentFocus: ['ARTICLE']
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

  const articles = data.explorePublications.items

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl mb-6 font-bold">Recent Articles🗞️</h1>
      <div className="w-2/3 grid grid-cols-3 grid-rows gap-2">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Feed
