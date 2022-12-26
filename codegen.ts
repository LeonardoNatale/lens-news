import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://api.lens.dev/',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/': {
      preset: 'client',
      plugins: [],
      config: {
        dedupeFragments: true,
        skipTypename: true
      },
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
