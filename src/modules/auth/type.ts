export type DefaultProfileInfo = {
  id: string | undefined
  name?: string | null
  imgUrl: string
  handle: string
}

export type AuthContext = {
  address: string | undefined
  token: string | undefined
  defaultProfile: any
  login: any
}
