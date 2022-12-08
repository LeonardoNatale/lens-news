export const generateContext = (token: string | undefined) => {
  return {
    context: {
      headers: {
        'x-access-token': token
      }
    }
  }
}
