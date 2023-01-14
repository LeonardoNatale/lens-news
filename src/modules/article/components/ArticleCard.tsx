import React from 'react'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'
import Link from 'next/link'

type Article = {
  id: string
  createdAt: string
  metadata: {
    name: string
    description: string
    content: string
  }
}

type ArticleCardProps = {
  article: Article
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { metadata, createdAt } = article
  const formattedDate = dayjs(createdAt).format('DD/MM/YYYY')
  return (
    <Link href={`/article/${article.id}`}>
      <div className="bg-light-bg rounded-lg shadow-md p-6 h-80 overflow-hidden w-80">
        <p className="text-light-low-contrast font-medium text-sm uppercase tracking-wide">
          {formattedDate}
        </p>
        <h1 className="mt-2 text-2xl font-semibold leading-tight font-serif">
          {metadata.name}
        </h1>
        <ReactMarkdown className="text-sm mt-4 leading-relaxed font-serif">
          {metadata.content}
        </ReactMarkdown>
      </div>
    </Link>
  )
}

export default ArticleCard
