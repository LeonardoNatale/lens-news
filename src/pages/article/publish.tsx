/* pages/profile/[handle].tsx */
import { SetStateAction, useState, useEffect, createContext } from 'react'
import { useAuth } from '../../modules/auth/auth-provider'
import EditForm from '../../modules/article/components/EditForm'
import PreviewContext from '../../modules/article/components/PreviewContext'
import ArticlePreview from '../../modules/article/components/ArticlePreview'
import { useProfile } from '../../modules/profile/hooks'

const Publish = () => {
  const { profile, publications } = useProfile()
  const { address } = useAuth()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [articleText, setArticleText] = useState<string>('')
  const [articleHeading, setArticleHeading] = useState<string>('')

  const handleEditOrCancel = () => {
    setIsEditing((isEditing) => !isEditing)
  }

  const handleArticleModify = (
    name: SetStateAction<string>,
    content: SetStateAction<string>
  ) => {
    if (name == 'name') {
      console.log(articleHeading)
      setArticleHeading(content)
    } else {
      console.log(articleText)
      setArticleText(content)
    }
  }

  return (
    <PreviewContext.Provider value={{ articleHeading, articleText }}>
      <div className="content-center justify-center pt-20 grid grid-cols-4 gap-6">
        <EditForm onCancel={handleEditOrCancel} onArticleModify={handleArticleModify} />
        <ArticlePreview articleHeading={articleHeading} articleContent={articleText} />
      </div>
    </PreviewContext.Provider>
  )
}

export default Publish
