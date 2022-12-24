import { createContext } from 'react'

interface ArticlePreviewContextValue {
  name: string
  content: string
}

const PreviewContext = createContext<any>({
  name: '',
  content: ''
})

export default PreviewContext
