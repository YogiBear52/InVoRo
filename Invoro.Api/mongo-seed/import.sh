#!/bin/bash

# Initialize DB Schema
mongo --host mongo --port 27017 --username root --password example --authenticationDatabase admin < mongoInitializer.js

# Load Features from Json to collection
mongoimport --host mongo --port 27017 --username root --password example --authenticationDatabase admin --db Invoro --collection Features --type json --file Features.json --jsonArray