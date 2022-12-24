/* pages/profile/[handle].tsx */
import { SetStateAction, useState } from 'react'
import { useAuth } from '../../modules/auth/auth-provider'
import CreateArticleForm from '../../modules/article/components/CreateArticleForm'
import PreviewContext from '../../modules/article/components/PreviewContext'
import ArticlePreview from '../../modules/article/components/ArticlePreview'
import { useProfile } from '../../modules/profile/hooks'

const Publish = () => {
  const { profile, publications } = useProfile()
  const { address } = useAuth()
  const [articleText, setArticleText] = useState<string>('')
  const [articleHeading, setArticleHeading] = useState<string>('')

  const handleArticleModify = (
    name: SetStateAction<string>,
    content: SetStateAction<string>
  ) => {
    if (name == 'name') {
      setArticleHeading(content)
    } else {
      setArticleText(content)
    }
  }

  return (
    <PreviewContext.Provider value={{ articleHeading, articleText }}>
      <div className="flex justify-center">
        <div className="w-2/3 grid grid-cols-3 gap-6">
          <CreateArticleForm onArticleModify={handleArticleModify} />
          <ArticlePreview articleHeading={articleHeading} articleContent={articleText} />
        </div>
      </div>
    </PreviewContext.Provider>
  )
}

export default Publish
