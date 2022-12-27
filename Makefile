start:
	npm run dev

lint:
	npx concurrently --names prettier,eslint \
		'npx prettier --check "pages/**/*{ts,tsx}" "queries/*{ts,tsx}"' \
		'npx eslint "{pages,queries}/**/*.{ts,tsx}" --fix --max-warnings 0'

format:
	npx prettier --write "pages/**/*{ts,tsx}" "queries/*{ts,tsx}" --check

graph-ql/generate:
	npx graphql-codegen

graph-ql/watch:
	npx graphql-codegen -w
