#!/bin/bash

ROOTDIR=$(cd "$(dirname "$0")/.." && pwd)

echo "====> Stopping the Hyperledger Fabric network..."

cd "$ROOTDIR"/test-network || exit
./network.sh down
