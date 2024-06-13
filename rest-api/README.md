
## Description

Demo application (REST API) to interact with the chaincode deployed on Hyperledger Fabric blockchain.

## Installation

Generate a `.env` sample file (using the utility script `initialize_env.sh` if you have not already done so), then
install the project dependencies.

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

Now you can interact with the chaincode using the REST API provided listening on port 3000.

Once the application is running, open your browser and navigate to `http://localhost:3000/explorer`
to see the OpenApi specification.
