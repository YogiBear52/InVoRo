
# InVoRo &middot; [![Build Status](https://travis-ci.com/YogiBear52/InVoRo.svg?branch=master)](https://travis-ci.com/YogiBear52/InVoRo)

## Interactive Roadmap Voting System

### InVoRo

- In - Interactive
- Vo - Voting
- Ro - Roadmap

#### Invoro is based on two main assumptions:

- Any application has and needs a Roadmap.
- Client's feedback is NECESSARY and as soon as possible.

#### Got the problem?

<b>Why</b> don't we <b>expose</b> the <b>Roadmap</b> to our clients?

<b>Why</b> don't we make our clients <b>interactively vote</b> for their next most important features in our product's roadmap?

InVoRo is a <b>Win-Win</b> solution - You get to manage your roadmap and have your client's feedback, and your clients get the chance to influence.

## What does the project include?

This project packs a plug and play e2e frontend-backend-db system.

Expose Invoro component in your website, run the service and the DB, connect them to each other and you are ready to go.

Of course, the client's component is customizable.

## Tech notes:

1. The backend service is using by default MongoDB. You can implement your own DB service provider (Not yet developed).
    - The service doesn't have a built-in authentication mechanism. If you want, put the service behind an authentication service such as HTTPD / Nginx.
2. The backend service will be published as a [docker image](https://hub.docker.com/r/yogevmizrahi/invoro-api) based on a linux distribution.
3. The client is a React component which will be published as a [npm package](https://www.npmjs.com/package/invoro).

## Roadmap:

1. Release 1 - Show Features, Enable Voting system, Simple mongo creating script.
2. Release 2 - Make the service and the client component more customizable.
3. Release 3 - Privileges - Enable content modification on the UI only for authorized users.