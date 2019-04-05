#! /bin/bash

# Delete collection
mongo mongodb://root:example@mongo:27017/Invoro?authSource=admin --eval 'db.Features.drop()'

# Create collection
# TODO: loop though all collections
mongoimport --host mongo --port 27017 --username root --password example --authenticationDatabase admin --db Invoro --collection Features --type json --file Features.json --jsonArray