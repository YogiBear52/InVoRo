#! /bin/bash

# Delete collection
mongo mongodb://root:example@10.0.75.1:27017/Invoro?authSource=admin --eval 'db.Features.drop()'

# Create collection
# TODO: loop though all collections
mongoimport --host 10.0.75.1 --port 27017 --username root --password example --authenticationDatabase admin --db Invoro --collection Features --type json --file Features.json --jsonArray