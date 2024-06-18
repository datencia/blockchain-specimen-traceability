# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.2.0](https://github.com/datencia/blockchain-specimen-traceability/compare/v0.1.0...v0.2.0) (2024-06-18)


### Features

* **chaincode-listener:** add initial config ([1c1b453](https://github.com/datencia/blockchain-specimen-traceability/commit/1c1b453e2aa7a5c2a96b43805175ec753aa06cff))
* **chaincode-listener:** listen for specimen contract events ([a1427d6](https://github.com/datencia/blockchain-specimen-traceability/commit/a1427d62d10f80c220fda245a8a9b0a51de87c80))
* **chaincode:** create new function to change the status of a given specimen ([b959e05](https://github.com/datencia/blockchain-specimen-traceability/commit/b959e05fb8c3a83fa5ed31ec57bc4d30424aae22))
* **chaincode:** create new function to issue a study order to the lab for a given specimen ([5f030cc](https://github.com/datencia/blockchain-specimen-traceability/commit/5f030cc2902a842ae46c2b0424b81b89a0c190e3))
* **chaincode:** create new function to set as received by the lab a given specimen ([758e94f](https://github.com/datencia/blockchain-specimen-traceability/commit/758e94fa3af1b755b76f5904555869b27a7b7379))
* **chaincode:** send events to notify some points in the specimen life-cycle ([f4cb43e](https://github.com/datencia/blockchain-specimen-traceability/commit/f4cb43e53994d08cb17ab8d8a8255ade2b189520))
* **chaincode:** set the user User1@org1.example.com as the owner for the initial specimen set ([df276a6](https://github.com/datencia/blockchain-specimen-traceability/commit/df276a6070188d697bc6515810599a102d0f4570))
* **chaincode:** validate the current owner and return the specimen updated when transferring a specimen to another user ([5908aae](https://github.com/datencia/blockchain-specimen-traceability/commit/5908aae96c3f7f94b67f0ddc4834176bc535cef1))
* **rest-api:** add endpoint to change the status of a given specimen ([54c05bc](https://github.com/datencia/blockchain-specimen-traceability/commit/54c05bc8786c621395f154bb8f97a0921d603614))
* **rest-api:** add endpoint to create a laboratory case for a given specimen ([177a69e](https://github.com/datencia/blockchain-specimen-traceability/commit/177a69e976ba9a382d52f26dcb7da8fd7dfc33d2))
* **rest-api:** add endpoint to set a laboratory order for a given specimen ([662c12a](https://github.com/datencia/blockchain-specimen-traceability/commit/662c12a8030a512f2fdd3a65b8c8723e86e2c7fa))
* **rest-api:** pass the current owner to the transfer specimen chaincode function ([2422e2d](https://github.com/datencia/blockchain-specimen-traceability/commit/2422e2d897ef3c7210d52003b030fc8855ec5cb1))
* **rest-api:** save logs to a file ([3590017](https://github.com/datencia/blockchain-specimen-traceability/commit/35900178fd775637234e35d156bf680690d4e685))


### Bug Fixes

* **chaincode:** avoid ChangeSpecimenStatus function to set the status as ORDERED or ACCESSIONING ([dd0dc22](https://github.com/datencia/blockchain-specimen-traceability/commit/dd0dc22b25da5472271786a7ca3119d10edc1aba))
* **chaincode:** validate RegisterExtractedSpecimen arguments ([5d5b382](https://github.com/datencia/blockchain-specimen-traceability/commit/5d5b3825c932c506400c4512b17f2a2ff246c7cc))
* **rest-api:** catch and re-throw transaction errors ([d45c44d](https://github.com/datencia/blockchain-specimen-traceability/commit/d45c44d1abc3e0b8af3893a58c5a1d089fe600f9))
* **rest-api:** close the gateway connection when it is no longer required ([a2338a5](https://github.com/datencia/blockchain-specimen-traceability/commit/a2338a5e619910bf751fb3bfba7af2be06b4000a))

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
