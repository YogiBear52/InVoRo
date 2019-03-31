
# InVoRo &middot; [![Build Status](https://travis-ci.com/YogiBear52/InVoRo.svg?branch=master)](https://travis-ci.com/YogiBear52/InVoRo)


## Interactive Roadmap Voting System

### InVoRo
- In - Interactive
- Vo - Voting
- Ro - Roadmap

#### Invoro is based on two main assumptions:
- Any application has and needs a Roadmap.
- Client feedback is NECESSARY and as early as possible.

#### Got the problem?
<b>Why</b> don't we <b>expose</b> the <b>Roadmap</b> to our clients?

<b>Why</b> don't we make our clients <b>interactivly vote</b> for their next most important features in our product's roadmap?

InVoRo is a <b>Win-Win</b> solution.


## What does the project includes?
This porject will pack a plug and play e2e frontened-backend-db system.

Expose Invoro component in your website, run the DB and the service and you are ready to go.

Of course, you can design the component as you want.


## Tech notes:
1. The backend service is using by default MongoDB. You can implement your own DB service provider (Not yet developed).
	- The service doesn't have a built-in authentication mechanism. If you want, put the service behind an authentication service such as HTTPD / Nginx.
2. The backend service will be published as docker image based on a linux distribution.
3. The client is a React component which will be published as a npm package. 


## Roadmap:
1. Release 1 - Show Features, Enable Voting system, Simple mongo creating script.
2. Release 2 - Make the service and the client component more customizable.
3. Release 3 - Privilliges - to enable content modification with the UI.

