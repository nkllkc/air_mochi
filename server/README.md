# AirMochi Server

## Setup

1. Install node modules.

    With `npm`:

        npm install

2. Prepare deploy:

    With `npm`:

        npm run prepare-deploy

## Local Run

1. Just run.

    With `npm`:

        npm run start-locally

## GAE Deploy:

1. Make sure you run **npm run prepare-deploy**. 

2. Use gcloud tools:

    gcloud app deploy

# Following is inherited from [Node.js websocet example on GAE](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/master/appengine/websockets)
# Node.js websockets sample for Google App Engine

This sample demonstrates how to use websockets on
[Google App Engine Flexible Environment][appengine] with Node.js.

<!-- * [Setup](#setup)
* [Running locally](#running-locally)
* [Deploying to App Engine](#deploying-to-app-engine)
* [Running the tests](#running-the-tests) -->

## Setup

Before you can run or deploy the sample, you need to do the following:

1.  Refer to the [appengine/README.md][readme] file for instructions on
    running and deploying.
1.  Install dependencies:

    With `npm`:

        npm install

    or with `yarn`:

        yarn install

## Running locally

With `npm`:

    npm start

or with `yarn`:

    yarn start

## Deploying to App Engine

With `npm`:

    npm run deploy

or with `yarn`:

    yarn run deploy

## Running the tests

See [Contributing][contributing].

[appengine]: https://cloud.google.com/appengine/docs/flexible/nodejs
[readme]: ../README.md
[contributing]: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/CONTRIBUTING.md

