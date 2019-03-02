#! /bin/bash

# TODO: loop though all collections
mongoimport --host 10.0.75.1 --port 27017 --username root --password example --authenticationDatabase admin --db Invoro --collection Features --type json --file Features.json --jsonArray