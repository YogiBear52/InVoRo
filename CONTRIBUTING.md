## How to contribute

- Make sure your pull request is well detailed.
- Make sure new tests are written.
- Make sure tests sucessfully run on your local environment.

- We recommand you to open an Issue before writing the code. Our first feedback will prevent unfortunate waste of time in case of aritecture/roadmap issues. 

## Testing

Client: run `npm run test`

Server: on solution folder run `dotnet test` 

## Submitting changes

Make a Pull Request.

## Coding conventions

Keep the project's conventions.

## Publish a new version

- Each CI will automaticly publish an staging-artifact of Invoro - an docker image for ther service and a package for the client library.

- Publishing a new Release will be controled only by maintainers. Push a git tag with the version, and Travis-CI will automaticly push a new Docker Image of the server and a new package to npm.


Thanks,
Yogev, Lev
