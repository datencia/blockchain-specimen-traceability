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
    method: string;
    collectionTime: number;
    collector: string;
    patientId: string;
    status: SpecimenStatus;
    owner: string;
    orderNumber?: string;
    caseNumber?: string;
    receivedTime?: number;
}
