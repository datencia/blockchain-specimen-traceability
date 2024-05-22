# Hyperledger Caliper Tests

This folder contains benchmark tests for the specimen contract using Hyperledger Caliper.

Caliper is a blockchain performance benchmark framework, which allows users to test different blockchain
solutions with custom use cases, and get a set of performance test results.

> For detailed information about Caliper see [Hyperledger Caliper](https://hyperledger.github.io/caliper/)

## Running a Benchmark

To run the benchmarks present in this folder

1. Install the dependencies

   ```shell
   $ npm install
   ```

1. Run the benchmarks

   ```shell
   $ npm run benchmark:read
   $ npm run benchmark:write
   ```
