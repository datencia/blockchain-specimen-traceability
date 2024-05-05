import { CollectionMethod } from './collection-method.enum';

export type SpecimenStatus =
    | 'EXTRACTED'
    | 'ORDERED'
    | 'ACCESSIONING'
    | 'GROSSING'
    | 'PROCESSING'
    | 'DIAGNOSTIC'
    | 'INFORMED';

export interface Specimen {
    id: string;
    name: string;
    label: string;
    method: CollectionMethod;
    collectionTime: number;
    collector: string;
    patientId: string;
    status: SpecimenStatus;
    owner: string;
    orderNumber?: string;
    caseNumber?: string;
    receivedTime?: number;
}
