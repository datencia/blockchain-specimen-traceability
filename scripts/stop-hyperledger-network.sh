#!/bin/bash

ROOTDIR=$(cd "$(dirname "$0")/.." && pwd)

echo "====> Stopping the Hyperledger Fabric network..."

cd test-network || exit
./network.sh down
