# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 0.1.0 (2024-05-14)


### Features

* **chaincode:** add a function to get the transaction history of a given specimen ([cdca3bf](https://github.com/datencia/blockchain-specimen-traceability/commit/cdca3bf2126d02f1e87236a78997c8317c90fe82))
* **chaincode:** add a function to transfer a specimen to another owner ([7965d80](https://github.com/datencia/blockchain-specimen-traceability/commit/7965d80a1e475ff692ba581baebea875291d8eb3))
* **chaincode:** add a method to delete a specimen by id ([2f228f6](https://github.com/datencia/blockchain-specimen-traceability/commit/2f228f683421e0282a8b1faf36ae2ad938a5d418))
* **chaincode:** add a method to get a specimen stored in the ledger by id ([5629b96](https://github.com/datencia/blockchain-specimen-traceability/commit/5629b9664c45efa3a5e9b7b9947b9d779fd6c0cb))
* **chaincode:** add a method to get all specimens stored in the ledger ([8a32a0a](https://github.com/datencia/blockchain-specimen-traceability/commit/8a32a0a96ce8d33c8d601df99044288ac8903508))
* **chaincode:** add initial specimen asset definition ([180aa00](https://github.com/datencia/blockchain-specimen-traceability/commit/180aa00559c723f61c928031efb2f450b44afb37))
* **chaincode:** add initial specimen contract with an init ledger function ([77ac523](https://github.com/datencia/blockchain-specimen-traceability/commit/77ac52343c07213c7f2bc4abfff94cb63640d078))
* **chaincode:** create new method to register an extracted specimen ([4844d4f](https://github.com/datencia/blockchain-specimen-traceability/commit/4844d4f026d4793c6d85247d4b6ac92632444a02))
* **rest-api:** add a basic authentication mechanism ([3468e74](https://github.com/datencia/blockchain-specimen-traceability/commit/3468e742547f4ca8d7a4b7f5283a3c702220d684))
* **rest-api:** add a Fabric gateway client service ([923f9c1](https://github.com/datencia/blockchain-specimen-traceability/commit/923f9c14931389e3e60ae2c491af2a8bccc98329))
* **rest-api:** add basic endpoints to get specimens from the ledger ([7891643](https://github.com/datencia/blockchain-specimen-traceability/commit/7891643a91b2de17f3e1916fdb0fddc5521888a8))
* **rest-api:** add endpoint to allow deleting a specimen by id ([67b5053](https://github.com/datencia/blockchain-specimen-traceability/commit/67b5053218f54835afaf4db407ae0402d4248121))
* **rest-api:** add endpoint to allow register extracted specimens ([12d5b0c](https://github.com/datencia/blockchain-specimen-traceability/commit/12d5b0cd880a1111c1663bcc437dd501c16043c8))
* **rest-api:** add endpoint to get the transaction history for a given specimen ([602b79b](https://github.com/datencia/blockchain-specimen-traceability/commit/602b79b8fc02187a3d595d812b2b33b3ac941d28))
* **rest-api:** add endpoint to transfer a specimen between users ([90872e9](https://github.com/datencia/blockchain-specimen-traceability/commit/90872e905899b0dc6de22eae164f6c70592e9114))
* **rest-api:** document the endpoint using swagger ([2d13a11](https://github.com/datencia/blockchain-specimen-traceability/commit/2d13a11a571069343edb5b7cc91c420197c19eb7))
* **rest-api:** enable helmet & cors to protect the rest api ([3b6a03c](https://github.com/datencia/blockchain-specimen-traceability/commit/3b6a03c5faa33b78b6f07a9c7834b200184af880))
* **rest-api:** generate a UUID for every request and add it to the headers ([5faa652](https://github.com/datencia/blockchain-specimen-traceability/commit/5faa652e79895555d414f872ed3d7a4af8c191c5))
* **rest-api:** return the specimen collection time in a human-friendly format ([03a8d64](https://github.com/datencia/blockchain-specimen-traceability/commit/03a8d64b55316a06f5165634d139299d174ba3aa))
* **rest-api:** set '/api' as a global prefix for all routes ([7316dfc](https://github.com/datencia/blockchain-specimen-traceability/commit/7316dfc707ebf9bb7d91b9337662277d4f809ae3))
* **rest-api:** set the application minimal config ([02b9ac9](https://github.com/datencia/blockchain-specimen-traceability/commit/02b9ac9160839bb6e1f0ba6ef4aa74eb8f8ef4ed))
* **rest-api:** start the application on the configured port ([924bc41](https://github.com/datencia/blockchain-specimen-traceability/commit/924bc41b109612c9eb8f72f6def908227a1f64c2))


### Bug Fixes

* **rest-api:** data mix-up between patientId and owner when creating a specimen ([6d70c54](https://github.com/datencia/blockchain-specimen-traceability/commit/6d70c542f7dfa443e8a68e7050491a6c4c6b092c))
* **rest-api:** format as an ISO 8601 string the collectionTime response when creating a new specimen ([30f9c1e](https://github.com/datencia/blockchain-specimen-traceability/commit/30f9c1e82d8a7cb779df81b432b07e025d8c69f6))
