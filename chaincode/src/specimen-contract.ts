import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

import { Specimen, SpecimenStatus } from './specimen';

@Info({ title: 'SpecimenContract', description: 'Smart contract for specimen tracking' })
export class SpecimenContract extends Contract {
    private transitions: { [key in SpecimenStatus]: SpecimenStatus[] } = {
        EXTRACTED: ['ORDERED'],
        ORDERED: ['ACCESSIONING'],
        ACCESSIONING: ['GROSSING'],
        GROSSING: ['PROCESSING'],
        PROCESSING: ['DIAGNOSTIC'],
        DIAGNOSTIC: ['INFORMED'],
        INFORMED: [],
    };

    /**
     * Initializes the world state with a set of specimens
     *
     * @param {Context} ctx - The transaction context
     *
     * @return {Promise<void>}
     */
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const specimens: Specimen[] = [
            {
                id: '281e986c-da5f-4c80-94eb-c4545de1e1e1',
                name: 'Abdomen',
                label: 'B24 030-068-088 A',
                method: 'Biopsy',
                collectionTime: 1714673348000,
                collector: 'Practitioner/collector-1',
                patientId: 'Patient/alice',
                status: 'EXTRACTED',
                owner: 'User1@org1.example.com',
            },
            {
                id: '3c557bc5-87be-4d7c-86f5-e8ad820b4fa8',
                name: 'Skin of external ear',
                label: 'B24 030-068-088 B',
                method: 'Biopsy',
                collector: 'Practitioner/collector-1',
                collectionTime: 1714673348000,
                patientId: 'Patient/alice',
                status: 'EXTRACTED',
                owner: 'User1@org1.example.com',
            },
            {
                id: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
                name: 'Skin',
                label: 'B21 030-001-005 A',
                method: 'Biopsy',
                collectionTime: 1628840326000,
                collector: 'Practitioner/collector-2',
                patientId: 'Patient/bob',
                status: 'EXTRACTED',
                owner: 'User1@org1.example.com',
            },
            {
                id: 'da0cfac3-cc47-4640-b651-46271d187a7f',
                name: 'Adenoids',
                label: 'B23 030-068-011 A',
                method: 'Biopsy',
                collector: 'Practitioner/collector-3',
                collectionTime: 1680507526000,
                patientId: 'Patient/dave',
                status: 'EXTRACTED',
                owner: 'User1@org1.example.com',
            },
        ];

        for (const specimen of specimens) {
            await ctx.stub.putState(
                specimen.id,
                Buffer.from(stringify(sortKeysRecursive(specimen))),
            );
            console.info(`Specimen ${specimen.id} initialized!`);
        }
    }

    /**
     * Return all specimens found in the world state
     *
     * @param {Context} ctx - The transaction context
     *
     * @return {Promise<string>}
     */
    @Transaction(false)
    @Returns('string')
    public async GetAllSpecimens(ctx: Context): Promise<string> {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record: string;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    /**
     * Return the specimen stored in the world state with given id
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id to retrieve
     *
     * @return {Promise<Specimen>}
     */
    @Transaction(false)
    public async ReadSpecimen(ctx: Context, id: string): Promise<Specimen> {
        const assetJSON = await ctx.stub.getState(id);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The specimen ${id} does not exist`);
        }
        return JSON.parse(assetJSON.toString());
    }

    /**
     * Return the specimen transaction history stored in the world state with given id
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id to get the transaction history
     *
     * @return {Promise<string>}
     */
    @Transaction(false)
    public async ReadSpecimenHistory(ctx: Context, id: string): Promise<string> {
        const allResults = [];

        const iterator = await ctx.stub.getHistoryForKey(id);
        let result = await iterator.next();
        while (!result.done) {
            const { value, timestamp, txId, isDelete } = result.value;

            const strValue = Buffer.from(value.toString()).toString('utf8');
            // @ts-expect-error Error accessing to the seconds property as a 'Long' type when running in the blockchain
            const milliseconds = (timestamp.seconds + timestamp.nanos / 1000000000) * 1000;

            let record: { isDelete: boolean; timestamp: number; txId: string; data?: unknown } = {
                txId,
                isDelete,
                timestamp: milliseconds,
            };
            if (!isDelete) {
                record = {
                    ...record,
                    data: JSON.parse(strValue),
                };
            }
            allResults.push(record);

            result = await iterator.next();
        }

        return JSON.stringify(allResults);
    }

    /**
     * Issue a new specimen to the world state with given details
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id
     * @param {string} name - The specimen name
     * @param {string} label - Identifier assigned by the collector
     * @param {string} method - Method used to perform collection
     * @param {number} collectionTime - Collection time
     * @param {string} collector - Who collected the specimen
     * @param {string} owner - The person who currently holds the specimen
     * @param {string} patientId - The patient id the specimen comes from
     *
     * @return {Promise<Specimen>}
     */
    @Transaction()
    public async RegisterExtractedSpecimen(
        ctx: Context,
        id: string,
        name: string,
        label: string,
        method: string,
        collectionTime: number,
        collector: string,
        owner: string,
        patientId: string,
    ): Promise<Specimen> {
        const exists = await this.SpecimenExists(ctx, id);
        if (exists) {
            throw new Error(`The specimen ${id} already exists`);
        }

        const status = 'EXTRACTED';
        const specimen: Specimen = {
            id,
            name,
            label,
            status,
            patientId,
            method,
            collector,
            collectionTime,
            owner,
        };
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(specimen))));

        return specimen;
    }

    /**
     * Issue a study order to the laboratory for the given specimen
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id
     * @param {string} orderNumber - The order number associated with the specimen
     *
     * @return {Promise<Specimen>}
     */
    @Transaction()
    public async IssueOrderToTheLab(
        ctx: Context,
        id: string,
        orderNumber: string,
    ): Promise<Specimen> {
        if (!id) {
            throw new Error(`Invalid or missing specimen id`);
        }
        if (!orderNumber) {
            throw new Error(`Invalid or missing required parameters, orderNumber=${orderNumber}`);
        }

        let specimen: Specimen = await this.ReadSpecimen(ctx, id);

        if (specimen.status !== 'EXTRACTED') {
            throw new Error(`The specimen ${id} is currently ordered or under study.`);
        }

        const status = 'ORDERED';
        specimen = {
            ...specimen,
            orderNumber,
            status,
        };
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(specimen))));

        return specimen;
    }

    /**
     * Establishes a specimen as received by the laboratory, assigning it a case number for study
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id
     * @param {string} caseNumber - The case number assigned to the specimen by the laboratory
     * @param {number} receivedTime - The effective time when specimen is received by the laboratory
     *
     * @return {Promise<Specimen>}
     */
    @Transaction()
    public async RegisterLabCase(
        ctx: Context,
        id: string,
        caseNumber: string,
        receivedTime: number,
    ): Promise<Specimen> {
        if (!id) {
            throw new Error(`Invalid or missing specimen id`);
        }
        if (!caseNumber) {
            throw new Error(`Invalid or missing required parameters, caseNumber=${caseNumber}`);
        }
        if (!receivedTime) {
            throw new Error(`Invalid or missing required parameters, receivedTime=${receivedTime}`);
        }

        let specimen: Specimen = await this.ReadSpecimen(ctx, id);

        if (specimen.status !== 'ORDERED') {
            throw new Error(
                `The specimen ${id} has not been ordered or it is currently under study`,
            );
        }

        const status = 'ACCESSIONING';
        specimen = {
            ...specimen,
            caseNumber,
            receivedTime,
            status,
        };
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(specimen))));

        return specimen;
    }

    /**
     * Return true when specimen with given id exists in world state
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id to check
     *
     * @return {Promise<boolean>}
     */
    @Transaction(false)
    @Returns('boolean')
    public async SpecimenExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    /**
     *  Delete a given specimen from the world state
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id to be deleted
     *
     * @return {Promise<void>}
     */
    @Transaction()
    public async DeleteSpecimen(ctx: Context, id: string): Promise<void> {
        const exists = await this.SpecimenExists(ctx, id);
        if (!exists) {
            throw new Error(`The specimen ${id} does not exist`);
        }
        await ctx.stub.deleteState(id);
    }

    /**
     * Transfer a specimen between users
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id to be transferred
     * @param {string} currentOwner - Current owner of the specimen
     * @param {string} newOwner - New owner of the specimen
     *
     * @return {Promise<Specimen>} - The specimen updated
     */
    @Transaction()
    public async TransferSpecimen(
        ctx: Context,
        id: string,
        currentOwner: string,
        newOwner: string,
    ): Promise<Specimen> {
        const specimen: Specimen = await this.ReadSpecimen(ctx, id);

        if (specimen.owner !== currentOwner) {
            throw new Error(`Specimen ${id} is not owned by ${currentOwner}`);
        }
        specimen.owner = newOwner;

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(specimen))));

        return specimen;
    }

    /**
     * Change the status of a given specimen
     *
     * @param {Context} ctx - The transaction context
     * @param {string} id - The specimen id
     * @param {SpecimenStatus} status - The new status for the specimen
     *
     * @return {Promise<Specimen>} - The specimen updated
     */
    @Transaction()
    public async ChangeSpecimenStatus(
        ctx: Context,
        id: string,
        status: SpecimenStatus,
    ): Promise<Specimen> {
        const specimen: Specimen = await this.ReadSpecimen(ctx, id);

        if (!this.canTransition(specimen, status)) {
            throw new Error(
                `The status for the specimen ${id} cannot transition from ${specimen.status} to ${status}`,
            );
        }
        specimen.status = status;

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(specimen))));

        return specimen;
    }

    private canTransition(specimen: Specimen, newState: SpecimenStatus): boolean {
        return this.transitions[specimen.status]?.includes(newState) ?? false;
    }
}
