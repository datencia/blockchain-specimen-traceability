import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';

import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

import { Specimen } from './specimen';

@Info({ title: 'SpecimenContract', description: 'Smart contract for specimen tracking' })
export class SpecimenContract extends Contract {
    // InitLedger initializes the wold state with a set of specimens.
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const assets: Specimen[] = [
            {
                id: '281e986c-da5f-4c80-94eb-c4545de1e1e1',
                name: 'Abdomen',
                label: 'B24 030-068-088 A',
                method: 'Biopsia',
                collectionDateTime: 1714673348000,
                collector: 'Practitioner/collector-1',
                patientId: 'Patient/alice',
                status: 'EXTRACTED',
                owner: 'Practitioner/collector-1',
            },
            {
                id: '3c557bc5-87be-4d7c-86f5-e8ad820b4fa8',
                name: 'Abdomen',
                label: 'B24 030-068-088 B',
                method: 'Biopsia',
                collector: 'Practitioner/collector-1',
                collectionDateTime: 1714673348000,
                patientId: 'Patient/alice',
                status: 'EXTRACTED',
                owner: 'Practitioner/collector-1',
            },
            {
                id: '8acffb0a-f569-4da2-be14-6b0f6c97dbaa',
                name: 'Piel',
                label: 'B21 030-001-005 A',
                method: 'Biopsia',
                collectionDateTime: 1628840326000,
                collector: 'Practitioner/collector-2',
                patientId: 'Patient/bob',
                status: 'EXTRACTED',
                owner: 'Practitioner/collector-2',
            },
            {
                id: 'da0cfac3-cc47-4640-b651-46271d187a7f',
                name: 'Adenoides',
                label: 'B23 030-068-011 A',
                method: 'Biopsia',
                collector: 'Practitioner/collector-3',
                collectionDateTime: 1680507526000,
                patientId: 'Patient/dave',
                status: 'EXTRACTED',
                owner: 'Practitioner/collector-3',
            },
        ];

        for (const asset of assets) {
            asset.docType = 'specimen';
            await ctx.stub.putState(asset.id, Buffer.from(stringify(sortKeysRecursive(asset))));
            console.info(`Specimen ${asset.id} initialized!`);
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
}
