# Blockchain-based Specimen Traceability

Traceability system of pathological anatomy samples based on Blockchain.

## Introduction

This repository contains my bachelor's project in computer science completed at [UNIR](https://www.unir.net/).

The project is about the creation of a traceability system for pathological anatomy samples based on blockchain

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

1. Run the test network and create a channel

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
