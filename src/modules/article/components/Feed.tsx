import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { EXPLORE_ARTICLES } from '../explore-articles'

const Feed = () => {
  const { data, loading, error } = useQuery(EXPLORE_ARTICLES, {
    variables: {
      request: {
        sortCriteria: 'CURATED_PROFILES',
        limit: 32,
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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-6 font-bold">Hello Lens 🌿</h1>
      {articles.map((article: any) => (
        <div
          key={article.id}
          className="w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center"
        >
          {/* <img className="w-48" src={profile.avatarUrl || 'https://picsum.photos/200'} /> */}
          <p className="text-xl text-center mt-6">{article.metadata.name}</p>
          <p className="text-base text-gray-400  text-center mt-2">
            {article.metadata.description}
          </p>
          <Link href={`/profile/${article.profile.handle}`}>
            <p className="cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2">
              {`Author: ${article.profile.handle}`}
            </p>
          </Link>
          <p className="text-pink-600 text-sm font-medium text-center">
            {`TAGS: ${article.metadata.tags.join(',')}`}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Feed
