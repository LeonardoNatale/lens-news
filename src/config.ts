const getParamOrExit = (name: string) => {
  const param = process.env[name]
  if (!param) {
    console.error(`Required config param '${name}' missing`)
    process.exit(1)
  }
  return param
}

const getParam = (name: string) => {
  const param = process.env[name]
  if (!param) {
    return null
  }
  return param
}

export const PINATA_JWT = getParam('PINATA_JWT')
