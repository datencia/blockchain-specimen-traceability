# Blockchain-based Specimen Traceability

Traceability system of pathological anatomy samples based on Blockchain.

## Introduction

ADAPTATION COURSE TO THE DEGREE IN COMPUTER ENGINEERING (CAI) - PER 8270 Sept 2023

This repository contains my bachelor's project in computer science completed at [UNIR](https://www.unir.net/).

The project is about the creation of a traceability system for pathological anatomy samples based on blockchain

## Project Structure

This section describes the folder and file structure of the project:

```
.
├── apps
│   ├── caliper-tests
│   ├── chaincode
│   ├── chaincode-listener
│   └── rest-api
├── docs
├── scripts
├── test-network
├── CHANGELOG.md
├── nx.json
├── package.json
├── package-lock.json
└── README.md
```

- **apps:** Folder containing the chaincode and the demo applications.
   - **caliper-tests:** Folder containing Hyperledger Caliper tests.
   - **chaincode:** Folder containing smart contracts for Hyperledger Fabric.
   - **chaincode-listener:** Folder containing a small Node.js application listening for smart contract events.
   - **rest-api:** Folder containing the Node.js REST API application.
- **docs:** Project documentation folder.
- **scripts:** Folder containing utility scripts.
- **test-network:** Folder containing the Hyperledger Fabric test network setup.
- **CHANGELOG.md:** Changelog file for tracking project changes.
- **nx.json:** Configures Nx workspace settings, defining project structure and dependency management specific to Nx.
- **package.json:** Defines project metadata, scripts, and dependency management.
- **package-lock.json:** Locks down the exact versions of dependencies for reproducible builds.
- **README.md:** This file.

## Prerequisites

Before you start, you must install some prerequisite technology required:

- [Docker](https://www.docker.com/get-started) (and docker-compose)
- [Node.js](https://nodejs.org/en/about/) v18 or higher
- [Jq](https://jqlang.github.io/jq/)

## Quickstart

1. Clone this repo

   ```shell
   $ cd $HOME
   $ git clone https://github.com/datencia/blockchain-specimen-traceability.git
   $ cd blockchain-specimen-traceability
   ```

1. Install the project dependencies and the Hyperledger Fabric docker images and binaries

   ```shell
   $ npm install
   ```

1. Generate the `.env` files with the sample configuration for the demo applications

   ```shell
   $ ./scripts/initialize_env.sh rest-api
   $ ./scripts/initialize_env.sh chaincode-listener
   ```

1. Create the test network and a channel (from the `test-network` folder)

   ```shell
   $ cd test-network
   $ ./network.sh up createChannel
   ```

1. Deploy the smart contracts (from the `test-network` folder)

   ```shell
   $ cd test-network
   $ export PATH=${PWD}/../bin:$PATH
   $ export FABRIC_CFG_PATH=$PWD/../config/
   $ ./network.sh deployCC -ccn basic -ccp ../apps/chaincode -ccl typescript
   ```

1. Run the demo application (REST API)

   ```shell
   $ cd apps/rest-api
   $ npm start
   ```

Now you can interact with the chaincode using the REST API provided listening on port 3000.

Once the application is running, open your browser and navigate to `http://localhost:3000/explorer`
to see the OpenApi specification.

### Chaincode Events

Alternatively, you can also run a small application that will listen for events produced by the chaincode.
This application is only provided as an example. Each time it receives an event from the chaincode it produces a
console echo to show that the event has been captured.

To run this application, open a new command terminal and run:

```shell
$ cd apps/chaincode-listener
$ npm start
```

## Clean up

When you are finished, you can bring down the test network (from the `test-network` folder). The command will remove all
the nodes of the test network, and delete any ledger data that you created.

```shell
./network.sh down
```
