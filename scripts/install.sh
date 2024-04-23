#!/bin/bash

VERSION=2.5.7
CA_VERSION=1.5.10

ROOTDIR=$(cd "$(dirname "$0")" && pwd)

echo "====>  Installing Hyperledger Fabric binaries & Docker images..."

. ${ROOTDIR}/install-fabric.sh --fabric-version $VERSION --ca-version $CA_VERSION binary docker
