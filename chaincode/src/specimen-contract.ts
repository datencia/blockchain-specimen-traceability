import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

import { Specimen } from './specimen';

@Info({ title: 'SpecimenContract', description: 'Smart contract for specimen tracking' })
export class SpecimenContract extends Contract {
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

    // GetAllSpecimens returns all specimens found in the world state.
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

    // ReadSpecimen returns the specimen stored in the world state with given id.
    @Transaction(false)
    public async ReadSpecimen(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The specimen ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // ReadSpecimenHistory returns the specimen transaction history stored in the world state with given id.
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

    // RegisterExtractedSpecimen issues a new specimen to the world state with given details.
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

    // SpecimenExists returns true when specimen with given id exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async SpecimenExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // DeleteSpecimen deletes a given specimen from the world state.
    @Transaction()
    public async DeleteSpecimen(ctx: Context, id: string): Promise<void> {
        const exists = await this.SpecimenExists(ctx, id);
        if (!exists) {
            throw new Error(`The specimen ${id} does not exist`);
        }
        await ctx.stub.deleteState(id);
    }

    // TransferSpecimen updates the owner field of a specimen with given id in the world state, and returns the old owner.
    @Transaction()
    public async TransferSpecimen(ctx: Context, id: string, newOwner: string): Promise<string> {
        const specimenString = await this.ReadSpecimen(ctx, id);
        const specimen: Specimen = JSON.parse(specimenString);

        const oldOwner = specimen.owner;
        specimen.owner = newOwner;

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(specimen))));

        return JSON.stringify({ oldOwner, newOwner });
    }
}
