#!/bin/bash

ROOTDIR=$(cd "$(dirname "$0")/.." && pwd)

echo "====> Bringing up the Hyperledger Fabric network..."

cd test-network || exit
./network.sh up createChannel
