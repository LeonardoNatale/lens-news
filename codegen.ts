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
        avoidOptionals: true
      },
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
