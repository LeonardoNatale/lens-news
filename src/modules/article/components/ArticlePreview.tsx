import { useContext } from 'react'
import { useAuth } from '../../auth/auth-provider'
import PreviewContext from './PreviewContext'
import ReactMarkdown from 'react-markdown'

const ArticlePreview = (props: any) => {
  const { token } = useAuth()
  const articleData = useContext(PreviewContext)
  const markdownHeading = '## ' + articleData.articleHeading

  return (
    <div className="flex flex-col bg-slate-100 p-6 rounded-lg col-span-2">
      <ReactMarkdown>{markdownHeading}</ReactMarkdown>
      <ReactMarkdown>{articleData.articleText}</ReactMarkdown>
    </div>
  )
}

export default ArticlePreview
