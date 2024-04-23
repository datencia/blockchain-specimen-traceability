#!/bin/bash

VERSION=2.5.7
CA_VERSION=1.5.10

echo "====>  Installing Hyperledger Fabric binaries & Docker images..."

curl -sSL http://bit.ly/2ysbOFE | bash -s -- $VERSION $CA_VERSION -s
