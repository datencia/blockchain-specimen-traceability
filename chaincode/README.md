# Specimen Traceability Chaincode

This chaincode includes a smart contract to manage the traceability of samples in an anatomical pathology laboratory.
It shows how to create, read, update, transfer and delete a specimen.

## The Smart Contract

The smart contract implements the following functions:

| Function                  | Description                                                                                 |
|---------------------------|---------------------------------------------------------------------------------------------|
| InitLedger                | Initialise the ledger with an initial set of specimens.                                     |
| GetAllSpecimens           | Return all specimens found in the ledger.                                                   |
| ReadSpecimen              | Return the specimen stored in the ledger with given id.                                     |
| ReadSpecimenHistory       | Return the specimen transaction history stored in the ledger with given id.                 |
| RegisterExtractedSpecimen | Issue a new specimen to the ledger with given details.                                      |
| IssueOrderToTheLab        | Issue a study order to the laboratory for the given specimen.                               |
| RegisterLabCase           | Establishes a specimen as received by the laboratory, assigning it a case number for study. |
| SpecimenExists            | Return true when specimen with given id exists in the ledger.                               |
| DeleteSpecimen            | Delete a given specimen from the ledger.                                                    |
| TransferSpecimen          | Transfer a specimen between users.                                                          |
| ChangeSpecimenStatus      | Change the status of a given specimen.                                                      |
