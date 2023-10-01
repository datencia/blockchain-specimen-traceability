#!/bin/bash

VERSION=2.5.4
CA_VERSION=1.5.7

echo "====>  Installing Hyperledger Fabric binaries..."

curl -sSL http://bit.ly/2ysbOFE | bash -s -- $VERSION $CA_VERSION -s
