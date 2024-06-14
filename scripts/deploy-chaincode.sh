#!/bin/bash

ROOTDIR=$(cd "$(dirname "$0")/.." && pwd)

echo "====> Deploying the specimen chaincode..."

export PATH=${ROOTDIR}/bin:$PATH
export FABRIC_CFG_PATH=${ROOTDIR}/config/

cd "$ROOTDIR"/test-network || exit
./network.sh deployCC -ccn basic -ccp ../apps/chaincode -ccl typescript
