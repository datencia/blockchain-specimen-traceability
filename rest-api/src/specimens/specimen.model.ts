export interface Specimen {
    id: string;
    name: string;
    label: string;
    method: string;
    collectionDateTime: number;
    collector: string;
    patientId: string;
    status: string;
    owner: string;
    orderNumber?: string;
    caseNumber?: string;
    receivedDateTime?: number;
}
