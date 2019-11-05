#!/bin/bash

# Remove target directory if exists.
rm -rf target

# Create target directiry.
mkdir target

cd target

cmake ../src
make