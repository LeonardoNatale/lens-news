export type DefaultProfileInfo = {
  id: string | undefined
  name: string | undefined
  img_url: string
}

export type AuthContext = {
  address: string | undefined
  token: string | undefined
  defaultProfile: any
  connect: any
  login: any
}
