

# Vnd

This project was generated using [Nx](https://nx.dev).

## Development server

Run `nx serve vending-api` & Run `nx serve vending`
 for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.



## Build

Run `nx build vending-api` to build the api project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Run `nx build vending` to build the frontend project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running unit tests

Run `nx test vending-api` to execute the all tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e vending` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Docker
Run `docker build -t vending .`
Run `docker run -dp 3333:3333 vending`

Visit http://localhost:3333

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.


