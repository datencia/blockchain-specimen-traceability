# Blockchain-based Specimen Traceability

Traceability system of pathological anatomy samples based on Blockchain.

## Introduction

This repository contains my bachelor's project in computer science completed at [UNIR](https://www.unir.net/).

The project is about the creation of a traceability system for pathological anatomy samples based on blockchain

## Prerequisites

Before you start, you must install some prerequisite technology required:

- [Docker](https://www.docker.com/get-started) (and docker-compose)
- [Node.js](https://nodejs.org/en/about/) v18 or higher
- [Jq](https://jqlang.github.io/jq/)

## Quickstart

1. Clone this repo

    ```shell
    cd $HOME
    git clone https://github.com/datencia/blockchain-specimen-traceability.git
    cd blockchain-specimen-traceability
    ```

1. Install the Hyperledger Fabric docker images and binaries

    ```shell
    ./scripts/install.sh
    ```

1. Create the test network and a channel (from the `test-network` folder)

    ```shell
    cd test-network
    ./network.sh up createChannel
    ```

1. Deploy the smart contracts

    ```shell
    export PATH=${PWD}/../bin:$PATH
    export FABRIC_CFG_PATH=$PWD/../config/
    ./network.sh deployCC -ccn basic -ccp ../chaincode -ccl typescript
    ```

## Clean up

When you are finished, you can bring down the test network (from the `test-network` folder). The command will remove all
the nodes of the test network, and delete any ledger data that you created.

```shell
./network.sh down
```
