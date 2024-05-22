'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const { createRandomSpecimen } = require('../utils/create-random-specimen');

/**
 * Workload module for the benchmark round.
 */
class ReadSpecimenWorkload extends WorkloadModuleBase {

    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();

        this.txIndex = 0;
        this.limitIndex = 0;
        this.contractId = '';
    }

    /**
     * Initialize the workload module with the given parameters.
     *
     * @param {number} workerIndex The 0-based index of the worker instantiating the workload module.
     * @param {number} totalWorkers The total number of workers participating in the round.
     * @param {number} roundIndex The 0-based index of the currently executing round.
     * @param {Object} roundArguments The user-provided arguments for the round from the benchmark configuration file.
     * @param {ConnectorBase} sutAdapter The adapter of the underlying SUT.
     * @param {Object} sutContext The custom context object provided by the SUT adapter.
     * @async
     */
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        const {contractId, assets} = this.roundArguments;

        this.contractId = contractId;
        this.limitIndex = assets;

        console.log(`Creating test specimens for worker ${this.workerIndex}...`);
        for (let i = 0; i < this.limitIndex; i++) {
            const specimenId = `test-w${this.workerIndex}-tx${i}`;
            const specimen = createRandomSpecimen(specimenId);

            const request = {
                contractId: this.contractId,
                contractFunction: 'RegisterExtractedSpecimen',
                invokerIdentity: 'User1',
                contractArguments: [
                    specimenId,
                    specimen.specimenName,
                    specimen.specimenLabel,
                    specimen.collectionMethod,
                    specimen.collectionTime,
                    specimen.collector,
                    specimen.owner,
                    specimen.patientId,
                ],
                readOnly: false,
            };

            await this.sutAdapter.sendRequests(request);
        }
    }

    /**
     * Assemble TXs for the round.
     *
     * @return {Promise<TxStatus[]>}
     */
    async submitTransaction() {
        const randomId = Math.floor(Math.random() * this.limitIndex);
        const specimenId = `test-w${this.workerIndex}-tx${randomId}`;

        const args = {
            contractId: this.contractId,
            contractFunction: "ReadSpecimen",
            contractArguments: [
                specimenId,
            ],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(args);
    }

    /**
     * Clean up the workload module at the end of the round.
     *
     * @async
     */
    async cleanupWorkloadModule() {
        console.log(`Deleting test specimens for worker ${this.workerIndex}...`);
        for (let i = 0; i < this.limitIndex; i++) {
            const specimenId = `test-w${this.workerIndex}-tx${i}`;
            const request = {
                contractId: this.contractId,
                contractFunction: 'DeleteSpecimen',
                invokerIdentity: 'User1',
                contractArguments: [specimenId],
                readOnly: false,
            };
            await this.sutAdapter.sendRequests(request);
        }
    }

}

/**
 * Create a new instance of the workload module.
 *
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new ReadSpecimenWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
