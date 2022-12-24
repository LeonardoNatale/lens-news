import { createContext } from 'react'

interface ArticlePreviewContextValue {
  title: string
  content: string
}

const PreviewContext = createContext<any>({
  title: '',
  content: ''
})

export default PreviewContext
