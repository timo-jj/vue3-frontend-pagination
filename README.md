# Welcome

## Project Setup

```sh
yarn install --frozen-lockfile
```

Start the backend:

```sh
yarn server
```

Separately, start the frontend:

```sh
yarn dev
```

### Build and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)

```sh
yarn test:unit # or `yarn test:unit:ci` for headless testing
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn build
yarn test:e2e # or `yarn test:e2e:ci` for headless testing
```
