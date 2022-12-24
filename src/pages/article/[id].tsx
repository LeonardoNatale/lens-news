import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { GET_ARTICLE } from '../../modules/article/get-article'

const Article = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: {
      request: {
        publicationId: id
      }
    }
  })

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  const article = data.publication

  return (
    <div className="flex justify-center">
      <div className="w-2/3">
        <Link href={`/profile/${article.profile.handle}`}>
          <p className="cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2">
            {`Author: ${article.profile.handle}`}
          </p>
        </Link>
        <h1 className="text-5xl mb-6 font-bold">{article.metadata.name}</h1>
        {/* <img className="w-48" src={profile.avatarUrl || 'https://picsum.photos/200'} /> */}
        <p className="text-xl text-center mt-6">{article.metadata.description}</p>
        <p className="mt-4 text-gray-700 leading-relaxed font-serif">
          <ReactMarkdown>{article.metadata.content}</ReactMarkdown>
        </p>

        {/* <p className="text-pink-600 text-sm font-medium text-center">
        {`TAGS: ${article.metadata.tags.join(',')}`}
      </p> */}
      </div>
    </div>
  )
}

export default Article
